// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Post from './Post';
// import debounce from 'lodash.debounce';

// const PostForm = () => {
//   const [content, setContent] = useState('');
//   const [error, setError] = useState('');
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = useCallback(debounce(async () => {
//     setLoading(true);
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (!user) {
//         throw new Error('User not logged in');
//       }
//       const response = await axios.get('http://localhost:8000/api/posts', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       const postsWithCommentsAndLikes = await Promise.all(
//         sortedPosts.map(async post => {
//           const commentsResponse = await axios.get(`http://localhost:8000/api/posts/${post.id}/comments`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('authToken')}`
//             }
//           });
//           post.comments = commentsResponse.data;

//           const likesResponse = await axios.get(`http://localhost:8000/api/posts/${post.id}/likes`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('authToken')}`
//             }
//           });
//           post.likes = likesResponse.data.likes;
//           post.userHasLiked = likesResponse.data.userHasLiked;

//           return post;
//         })
//       );
//       setPosts(postsWithCommentsAndLikes);
//       setError('');
//     } catch (error) {
//       setError(error.message || 'Error fetching posts');
//     } finally {
//       setLoading(false);
//     }
//   }, 300), []);

//   const handleContentChange = (e) => {
//     setContent(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const user = JSON.parse(localStorage.getItem('user'));
  
//     if (!user) {
//       setError('User not logged in');
//       return;
//     }
  
//     const postData = {
//       user_id: user.id,
//       content,
//     };
  
//     try {
//       let response;
//       if (editingPost) {
//         response = await axios.put(`http://localhost:8000/api/posts/${editingPost.id}`, postData, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`
//           }
//         });
//         // Update the specific post in the state and retain comments
//         setPosts((prevPosts) =>
//           prevPosts.map((post) =>
//             post.id === editingPost.id ? { ...response.data, user, comments: post.comments, likes: post.likes, userHasLiked: post.userHasLiked } : post
//           )
//         );
//       } else {
//         response = await axios.post('http://localhost:8000/api/posts', postData, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`
//           }
//         });
//         // Add the new post to the state
//         setPosts((prevPosts) => [
//           { ...response.data, user, comments: [], likes: 0, userHasLiked: false },
//           ...prevPosts,
//         ]);
//       }
//       setContent('');
//       setEditingPost(null);
//       setError('');
//     } catch (error) {
//       setError(error.response?.data?.message || 'An error occurred');
//     }
//   };

//   const handleEdit = (post) => {
//     setContent(post.content);
//     setEditingPost(post);
//   };

//   const handleDelete = async (post) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/posts/${post.id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
//     } catch (error) {
//       setError('Error deleting post');
//     }
//   };

//   const handleCancel = () => {
//     setContent('');
//     setEditingPost(null);
//   };

//   const handleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:8000/api/posts/${postId}/like`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       // Update the specific post in the state
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId ? { ...post, likes: post.likes + 1, userHasLiked: true } : post
//         )
//       );
//     } catch (error) {
//       setError('Error liking post');
//     }
//   };
  
//   const handleUnlike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:8000/api/posts/${postId}/unlike`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       // Update the specific post in the state
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId ? { ...post, likes: post.likes - 1, userHasLiked: false } : post
//         )
//       );
//     } catch (error) {
//       setError('Error unliking post');
//     }
//   };

//   const handleCommentSubmit = async (postId, comment) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (!user) {
//         setError('User not logged in');
//         return;
//       }
//       const response = await axios.post(`http://localhost:8000/api/posts/${postId}/comments`, { comment, post_id: postId }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       const newComment = response.data;
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
//         )
//       );
//     } catch (error) {
//       setError('Error submitting comment');
//     }
//   };
  
//   const handleCommentEdit = async (commentId, newContent) => {
//     try {
//       const commentData = { comment: newContent };
//       const response = await axios.put(`http://localhost:8000/api/comments/${commentId}`, commentData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       const updatedComment = response.data;
//       setPosts((prevPosts) =>
//         prevPosts.map((post) => ({
//           ...post,
//           comments: post.comments.map((comment) =>
//             comment.id === commentId ? updatedComment : comment
//           )
//         }))
//       );
//     } catch (error) {
//       setError(error.response?.data?.message || 'Error editing comment');
//     }
//   };
  
//   const handleCommentDelete = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setPosts((prevPosts) =>
//         prevPosts.map((post) => ({
//           ...post,
//           comments: post.comments.filter((comment) => comment.id !== commentId)
//         }))
//       );
//     } catch (error) {
//       setError('Error deleting comment');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="mb-4">
//         <textarea
//           className="w-full p-2 mb-2 border rounded"
//           placeholder="Content"
//           value={content}
//           onChange={handleContentChange}
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           {editingPost ? 'Update' : 'Submit'}
//         </button>
//         {editingPost && <button onClick={handleCancel} type="button" className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
//       </form>

//       {loading ? (
//         <p>Loading posts...</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post.id} className="mb-4 p-4 border rounded shadow-sm">
//             {post.user && <p className="font-bold">{post.user.first_name} {post.user.last_name}</p>}
//             <Post
//               post={post}
//               onEdit={() => handleEdit(post)}
//               onDelete={() => handleDelete(post)}
//               onLike={() => handleLike(post.id)}
//               onUnlike={() => handleUnlike(post.id)}
//               onCommentSubmit={(comment) => handleCommentSubmit(post.id, comment)}
//               onCommentEdit={(commentId, newContent) => handleCommentEdit(commentId, newContent)}
//               onCommentDelete={(commentId) => handleCommentDelete(commentId)}
//               isEditing={editingPost && editingPost.id === post.id}
//               onCancel={handleCancel}
//             />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PostForm;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import debounce from 'lodash.debounce';
import { Ellipsis } from "lucide-react"


const PostForm = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(debounce(async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error('User not logged in');
      }
      const response = await axios.get('http://localhost:8000/api/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const postsWithCommentsAndLikes = await Promise.all(
        sortedPosts.map(async post => {
          const commentsResponse = await axios.get(`http://localhost:8000/api/posts/${post.id}/comments`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          post.comments = commentsResponse.data;

          const likesResponse = await axios.get(`http://localhost:8000/api/posts/${post.id}/likes`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          post.likes = likesResponse.data.likes;
          post.userHasLiked = likesResponse.data.userHasLiked;

          return post;
        })
      );
      setPosts(postsWithCommentsAndLikes);
      setError('');
    } catch (error) {
      setError(error.message || 'Error fetching posts');
    } finally {
      setLoading(false);
    }
  }, 300), []);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user) {
      setError('User not logged in');
      return;
    }
  
    const postData = {
      user_id: user.id,
      content,
    };
  
    try {
      let response;
      if (editingPost) {
        response = await axios.put(`http://localhost:8000/api/posts/${editingPost.id}`, postData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        // Update the specific post in the state and retain comments
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editingPost.id ? { ...response.data, user, comments: post.comments, likes: post.likes, userHasLiked: post.userHasLiked } : post
          )
        );
      } else {
        response = await axios.post('http://localhost:8000/api/posts', postData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        // Add the new post to the state
        setPosts((prevPosts) => [
          { ...response.data, user, comments: [], likes: 0, userHasLiked: false },
          ...prevPosts,
        ]);
      }
      setContent('');
      setEditingPost(null);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleEdit = (post) => {
    setContent(post.content);
    setEditingPost(post);
  };

  const handleDelete = async (post) => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
    } catch (error) {
      setError('Error deleting post');
    }
  };

  const handleCancel = () => {
    setContent('');
    setEditingPost(null);
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8000/api/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      // Update the specific post in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1, userHasLiked: true } : post
        )
      );
    } catch (error) {
      setError('Error liking post');
    }
  };
  
  const handleUnlike = async (postId) => {
    try {
      await axios.post(`http://localhost:8000/api/posts/${postId}/unlike`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      // Update the specific post in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes - 1, userHasLiked: false } : post
        )
      );
    } catch (error) {
      setError('Error unliking post');
    }
  };

  const handleCommentSubmit = async (postId, comment) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setError('User not logged in');
        return;
      }
      const response = await axios.post(`http://localhost:8000/api/posts/${postId}/comments`, { comment, post_id: postId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const newComment = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
        )
      );
    } catch (error) {
      setError('Error submitting comment');
    }
  };
  
  const handleCommentEdit = async (commentId, newContent) => {
    try {
      const commentData = { comment: newContent };
      const response = await axios.put(`http://localhost:8000/api/comments/${commentId}`, commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const updatedComment = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          )
        }))
      );
    } catch (error) {
      setError(error.response?.data?.message || 'Error editing comment');
    }
  };
  
  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId)
        }))
      );
    } catch (error) {
      setError('Error deleting comment');
    }
  };

  return (
    <div className="flex flex-row h-[91vh]  overflow-y-scroll ... bg-white-100 justify-center">
      <div className="col-span-2 space-y-4 w-[50rem]">
        <div className="bg-slate-100 p-4 rounded-lg  justify-center">
          <div className="flex items-center space-x-4 justify-center focus:outline-none focus:ring-1 focus:ring-cyan-500  ">
            <img
              className="w-12 h-12 rounded-full "
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="User Avatar"
            />
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mb-4 space-y-4 ">
            <input
              className="flex-grow p-2 bg-slate-200 rounded-lg justify-center px-20 cursor-pointer hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 shadow"
              type="text"
              placeholder="What's on your mind?"
              value={content}
              onChange={handleContentChange}
              rows="4"
            />
            <button type="submit" className="p-2 bg-cyan-500 text-zinc-900 rounded-lg ml-3 hover:bg-cyan-300 font-semibold">
                {editingPost ? 'Update' : 'Post'}
              </button>
              {editingPost && <button onClick={handleCancel} type="button" className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
            </form>
          </div>
            

      {loading ? (
        <p className='text-black'>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border bg-gray-100 rounded-lg shadow-md mt-6  ml-15 mx-auto w-[40rem]">
            <div className="flex items-center mb-2 relative -mt-18">
                <span className="post-date text-gray-600 absolute top-0 right-0 cursor-pointer" >
                <Ellipsis />
              </span>

              {post.user.profile_picture && (
                <img src={`http://localhost:8000/storage/${post.user.profile_picture}`} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              )}
              <p className="font-bold">{post.user.first_name} {post.user.last_name}</p>
            </div>
            {post.image && (
              <div className="my-2">
                <img src={`http://localhost:8000/storage/${post.image}`} alt="Post" className="max-w-full h-auto" />
              </div>
            )}
            <Post
              post={post}
              onEdit={() => handleEdit(post)}
              onDelete={() => handleDelete(post)}
              onLike={() => handleLike(post.id)}
              onUnlike={() => handleUnlike(post.id)}
              onCommentSubmit={(comment) => handleCommentSubmit(post.id, comment)}
              onCommentEdit={(commentId, newContent) => handleCommentEdit(commentId, newContent)}
              onCommentDelete={(commentId) => handleCommentDelete(commentId)}
              isEditing={editingPost && editingPost.id === post.id}
              onCancel={handleCancel}
            />
          </div>
        ))
      )}
    </div>
    </div>
    </div>
  );
};

export default PostForm;
