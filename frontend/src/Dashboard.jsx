// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useTheme } from './App';
// import moment from 'moment';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [content, setContent] = useState('');
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [editContent, setEditContent] = useState('');
//   const [commentContent, setCommentContent] = useState({});
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editCommentContent, setEditCommentContent] = useState('');
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef();
//   const navigate = useNavigate();
//   const { theme } = useTheme();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const authToken = localStorage.getItem('authToken');

//     if (storedUser && authToken) {
//       setUser(JSON.parse(storedUser));
//       fetchPosts(authToken, 1);
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);
  
//   const fetchPosts = async (authToken, page) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/posts?page=${page}&per_page=5`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       if (response.data.data.length > 0) {
//         setPosts(prevPosts => {
//           const newPosts = response.data.data.filter(post => !prevPosts.some(existingPost => existingPost.id === post.id));
//           return [...prevPosts, ...newPosts];
//         });
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   const lastPostElementRef = useCallback(node => {
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPage(prevPage => prevPage + 1);
//       }
//     });
//     if (node) observer.current.observe(node);
//   }, [hasMore]);

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     if (authToken && page > 1) {
//       fetchPosts(authToken, page);
//     }
//   }, [page]);

//   const handleContentChange = (e) => setContent(e.target.value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const authToken = localStorage.getItem('authToken');

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/posts',
//         { content },
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );
//       setPosts([response.data, ...posts]);
//       setContent('');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       setError('Failed to create post. Please try again.');
//     }
//   };

//   const handleEdit = (postId, currentContent) => {
//     setEditingPostId(postId);
//     setEditContent(currentContent);
//   };

//   const handleEditContentChange = (e) => setEditContent(e.target.value);

//   const handleUpdate = async (postId) => {
//     const authToken = localStorage.getItem('authToken');
  
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/posts/${postId}`,
//         { content: editContent },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       setPosts(posts.map(post =>
//         post.id === postId ? { ...response.data, comments: post.comments } : post
//       ));
  
//       setEditingPostId(null);
//       setEditContent('');
//     } catch (error) {
//       console.error('Error updating post:', error);
//       setError('Failed to update post. Please try again.');
//     }
//   };
  

//   const handleCancel = () => {
//     setEditingPostId(null);
//     setEditContent('');
//   };

//   const handleDelete = async (postId) => {
//     const authToken = localStorage.getItem('authToken');

//     try {
//       await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       setPosts(posts.filter(post => post.id !== postId));
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   const handleCommentChange = (e, postId) => {
//     setCommentContent({ ...commentContent, [postId]: e.target.value });
//   };

//   const handleSubmitComment = async (postId) => {
//     const authToken = localStorage.getItem('authToken');

//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/posts/${postId}/comments`,
//         { content: commentContent[postId] },
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );
//       setPosts(posts.map(post =>
//         post.id === postId ? { ...post, comments: [...(post.comments || []), response.data] } : post
//       ));
//       setCommentContent({ ...commentContent, [postId]: '' });
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       setError('Failed to add comment. Please try again.');
//     }
//   };

//   const handleEditComment = (commentId, currentContent) => {
//     setEditingCommentId(commentId);
//     setEditCommentContent(currentContent);
//   };

//   const handleEditCommentContentChange = (e) => setEditCommentContent(e.target.value);

//   const handleUpdateComment = async (commentId, postId) => {
//     const authToken = localStorage.getItem('authToken');

//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/comments/${commentId}`,
//         { content: editCommentContent },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       // Include the user and created_at fields in the updated comment
//       const updatedComment = {
//         ...response.data,
//         user: posts.find(post => post.id === postId).comments.find(comment => comment.id === commentId).user,
//         created_at: posts.find(post => post.id === postId).comments.find(comment => comment.id === commentId).created_at,
//       };
//       setPosts(posts.map(post =>
//         post.id === postId ? {
//           ...post,
//           comments: post.comments.map(comment =>
//             comment.id === commentId ? updatedComment : comment
//           )
//         } : post
//       ));
//       setEditingCommentId(null);
//       setEditCommentContent('');
//     } catch (error) {
//       console.error('Error updating comment:', error);
//       setError('Failed to update comment. Please try again.');
//     }
//   };

//   const handleCancelComment = () => {
//     setEditingCommentId(null);
//     setEditCommentContent('');
//   };

//   const handleDeleteComment = async (commentId, postId) => {
//     const authToken = localStorage.getItem('authToken');

//     try {
//       await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       setPosts(posts.map(post =>
//         post.id === postId ? {
//           ...post,
//           comments: post.comments.filter(comment => comment.id !== commentId)
//         } : post
//       ));
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   const handleLike = async (postId) => {
//     const authToken = localStorage.getItem('authToken');

//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/posts/${postId}/like`,
//         {},
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );
//       setPosts(posts.map(post =>
//         post.id === postId ? { ...post, likes_count: response.data.likes_count, liked: response.data.liked } : post
//       ));
//     } catch (error) {
//       console.error('Error liking/unliking post:', error);
//       setError('Failed to like/unlike post. Please try again.');
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

  

//   return (
//     <div className={`flex-1 flex flex-col ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
//       <form onSubmit={handleSubmit} className="mb-6 space-y-4">
//         <input
//           placeholder="What's on your mind?"
//           value={content}
//           onChange={handleContentChange}
//           className={`w-full h-32 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//         />
//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
//         >
//           Post
//         </button>
//       </form>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <div className="space-y-4">
//         {posts.map((post, index) => (
//           <div key={post.id} ref={index === posts.length - 1 ? lastPostElementRef : null} className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-md shadow-md`}>
//             <div className="flex justify-between items-center mb-4">
//               <div className="text-sm">
//                 {post.user && `${post.user.first_name} ${post.user.last_name} on ${moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}
//               </div>
//               {post.user_id === user.id && (
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(post.id, post.content)}
//                     className="py-1 px-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(post.id)}
//                     className="py-1 px-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//             {editingPostId === post.id ? (
//               <div>
//                 <input
//                   value={editContent}
//                   onChange={handleEditContentChange}
//                   className={`w-full h-32 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                 />
//                 <div className="flex space-x-2 mt-2">
//                   <button
//                     onClick={() => handleUpdate(post.id)}
//                     className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-white"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md transition duration-200 text-white"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p>{post.content}</p>
//             )}
//             <div className="flex space-x-2 mt-2">
//               <button
//                 onClick={() => handleLike(post.id)}
//                 className={`py-1 px-2 rounded-md text-white ${post.liked ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
//               >
//                 {post.liked ? 'Unlike' : 'Like'}
//               </button>
//               <span>{post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}</span>
//             </div>
//             <div className="mt-4 space-y-2">
//               {(post.comments || []).map((comment) => (
//                 <div key={comment.id} className={`p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md`}>
//                   <div className="flex justify-between items-center">
//                     <div className="text-sm">
//                       {comment.user && `${comment.user.first_name} ${comment.user.last_name} on ${moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}
//                     </div>
//                     {comment.user_id === user.id && editingCommentId !== comment.id && (
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleEditComment(comment.id, comment.content)}
//                           className="py-1 px-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteComment(comment.id, post.id)}
//                           className="py-1 px-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   {editingCommentId === comment.id ? (
//                     <div>
//                       <input
//                         value={editCommentContent}
//                         onChange={handleEditCommentContentChange}
//                         className={`w-full h-20 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2`}
//                       />
//                       <div className="flex space-x-2 mt-2">
//                         <button
//                           onClick={() => handleUpdateComment(comment.id, post.id)}
//                           className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-white"
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={handleCancelComment}
//                           className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md transition duration-200 text-white"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="mt-2">{comment.content}</p>
//                   )}
//                 </div>
//               ))}
              
//               <div className="mt-4">
//                 <form onSubmit={(e) => { e.preventDefault(); handleSubmitComment(post.id); }} className="space-y-2">
//                   <input
//                     placeholder="Add a comment..."
//                     value={commentContent[post.id] || ''}
//                     onChange={(e) => handleCommentChange(e, post.id)}
//                     className={`w-full px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   />
//                   <button
//                     type="submit"
//                     className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-white"
//                   >
//                     Comment
//                   </button>
//                 </form>
//               </div>
//             </div>
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './App';
import moment from 'moment';
import { Ellipsis } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [commentContent, setCommentContent] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [openPostDropdowns, setOpenPostDropdowns] = useState({});
  const [openCommentDropdowns, setOpenCommentDropdowns] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');

    if (storedUser && authToken) {
      setUser(JSON.parse(storedUser));
      fetchPosts(authToken, 1);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchPosts = async (authToken, page) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/posts?page=${page}&per_page=5`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data.data.length > 0) {
        setPosts(prevPosts => {
          const newPosts = response.data.data.filter(post => !prevPosts.some(existingPost => existingPost.id === post.id));
          return [...prevPosts, ...newPosts];
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const lastPostElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken && page > 1) {
      fetchPosts(authToken, page);
    }
  }, [page]);

  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post(
        'http://localhost:8000/api/posts',
        { content },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setPosts([response.data, ...posts]);
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  const handleEdit = (postId, currentContent) => {
    setEditingPostId(postId);
    setEditContent(currentContent);
  };

  const handleEditContentChange = (e) => setEditContent(e.target.value);

  const handleUpdate = async (postId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/${postId}`,
        { content: editContent },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setPosts(posts.map(post =>
        post.id === postId ? { ...response.data, comments: post.comments } : post
      ));

      setEditingPostId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingPostId(null);
    setEditContent('');
  };

  const handleDelete = async (postId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCommentChange = (e, postId) => {
    setCommentContent({ ...commentContent, [postId]: e.target.value });
  };

  const handleSubmitComment = async (postId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/comments`,
        { content: commentContent[postId] },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), response.data] } : post
      ));
      setCommentContent({ ...commentContent, [postId]: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment. Please try again.');
    }
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditCommentContent(currentContent);
  };

  const handleEditCommentContentChange = (e) => setEditCommentContent(e.target.value);

  const handleUpdateComment = async (commentId, postId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.put(
        `http://localhost:8000/api/comments/${commentId}`,
        { content: editCommentContent },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const updatedComment = {
        ...response.data,
        user: posts.find(post => post.id === postId).comments.find(comment => comment.id === commentId).user,
        created_at: posts.find(post => post.id === postId).comments.find(comment => comment.id === commentId).created_at,
      };
      setPosts(posts.map(post =>
        post.id === postId ? {
          ...post,
          comments: post.comments.map(comment =>
            comment.id === commentId ? updatedComment : comment
          )
        } : post
      ));
      setEditingCommentId(null);
      setEditCommentContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
      setError('Failed to update comment. Please try again.');
    }
  };

  const handleCancelComment = () => {
    setEditingCommentId(null);
    setEditCommentContent('');
  };

  const handleDeleteComment = async (commentId, postId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPosts(posts.map(post =>
        post.id === postId ? {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        } : post
      ));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLike = async (postId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, likes_count: response.data.likes_count, liked: response.data.liked } : post
      ));
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      setError('Failed to like/unlike post. Please try again.');
    }
  };

  const togglePostDropdown = (postId) => {
    setOpenPostDropdowns((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleCommentDropdown = (commentId) => {
    setOpenCommentDropdowns((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const closeDropdowns = (e) => {
    setOpenPostDropdowns({});
    setOpenCommentDropdowns({});
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdowns);
    return () => {
      document.removeEventListener('click', closeDropdowns);
    };
  }, []);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex-1 flex flex-col ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-row  justify-center">
        <div className="col-span-2 space-y-4 w-[50rem]">
            <div className={`rounded-lg  justify-center flex  shadow ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
              
          <form onSubmit={handleSubmit} className={`mb-4 space-y-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            <input
              placeholder="What's on your mind?"
              value={content}
              onChange={handleContentChange}
              className={` mx-auto flex-grow py-5 px-20 bg-gray-200 rounded-lg justify-center hover:bg-gray-100  focus:ring-1 focus:ring-indigo-500   border-stroke text-dark placeholder-dark-6 outline-none placeholder-gray-500 text-sm focus:outline-none active:outline-none h-11 border border-gray-300  ${theme === 'dark' ? 'bg-gray-800 border border-gray-600 text-white' : 'bg-gray-100 text-black border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="submit"
              className="transition duration-200 p-2 bg-indigo-500  ml-3 hover:bg-indigo-600  inline-flex items-center justify-center rounded-full border border-primary bg-primary px-4 py-2 text-center text-base font-medium text-white"
            >
              Post
            </button>
          </form>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id} ref={index === posts.length - 1 ? lastPostElementRef : null} className={`mb-4 p-4 bg-gray-100 rounded-lg shadow-lg mt-6  ml-15 mx-auto w-[40rem] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-md shadow-md`}>
                <div className="items-center mb-2 flex  -mt-18">
                  {post.user.profile_image_url ? (
                    <img src={post.user.profile_image_url} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 mr-4">
                      No Image
                    </div>
                  )}
                  <div className="text-sm mb-5 ">
                    <p className={`font-bold text-lg	${theme === 'dark' ? ' text-white' : ' text-black'}`}> {post.user.first_name} {post.user.last_name}</p> 
                    <p className={`text-xs		${theme === 'dark' ? ' text-gray-50' : ' text-gray-500'}`}> {moment(post.created_at).format('MMMM Do YYYY, h:mm a')}</p>
                  </div>
                    <div className=" flex space-x-2 ml-auto relative">
                     <button 
                      className=" post-date text-gray-600 cursor-pointer hover:bg-gray-200 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center "
                      onClick={(e) => { e.stopPropagation(); togglePostDropdown(post.id); }}
                    >
                      <Ellipsis />
                    </button>
                    {openPostDropdowns[post.id] && (
                      <div className=" absolute top-full left-0 bg-white border border-gray-300 rounded-lg w-28 flex py-2">
                        {user && post.user_id === user.id && (
                    <>
                        <ul className="text-sm text-gray-700 dark:text-gray-500 w-28 items-center ">
                          <li>
                            <a href="#" onClick={() => handleEdit(post.id, post.content)} className=" px-2 py-2 hover:bg-gray-200 dark:hover:text-gray p-2 flex items-center mb-2 relative">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                              Edit
                            </a>
                          </li>
                          <li>
                            <a href="#"  onClick={() => handleDelete(post.id)} className=" px-2 py-2 hover:bg-gray-200 dark:hover:text-gray p-2 flex items-center mb-2 relative">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              Delete
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    </div>
                  )}
                </div>
                </div>
                {editingPostId === post.id ? (
                  <div>
                    <input
                      value={editContent}
                      onChange={handleEditContentChange}
                      className={`w-full h-20 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleUpdate(post.id)}
                        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-full transition duration-200 text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancel}
                        className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-full transition duration-200 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{post.content}</p>
                )}
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`rounded-full text-white ${post.liked ? 'stroke-red-500 text-red-200 flex items-center ' : 'flex items-center'}`}
                  >
                    {post.liked ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 fill-red-600 stroke-red-600 hover:bg-red-200 rounded-full px-2 py-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 stroke-gray-500 text-gray-200 hover:bg-gray-200 rounded-full px-2 py-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>}
                  </button>
                  <span className="mt-2 -ml-64">{post.likes_count}{post.likes_count === 2 ?'' : ''}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {(post.comments || []).map((comment) => (
                    <div key={comment.id} className={`p-2 comment border-t border-gray-500${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md`}>
                      <div className="flex items-center">
                        {comment.user.profile_image_url ? (
                          <img src={comment.user.profile_image_url} alt="Profile" className="w-8 h-8 rounded-full mr-4" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 mr-4">
                            No Image
                          </div>
                        )}
                        <div className="text-sm ">
                          <p className="font-bold text-base	"> {comment.user.first_name} ${comment.user.last_name}</p> 
                          <p className="text-gray-300 text-sm"> {moment(comment.created_at).format('MMMM Do YYYY, h:mm a')}</p>
                        </div>
                          <div className=" flex space-x-2 ml-auto relative">
                     <button 
                      className=" post-date text-gray-600 cursor-pointer hover:bg-gray-200 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center "
                      onClick={(e) => { e.stopPropagation(); toggleCommentDropdown(comment.id); }}
                    >
                      <Ellipsis />
                    </button>
                    {openCommentDropdowns[comment.id] && (
                      <div className=" absolute top-full left-0 bg-white border border-gray-300 rounded-lg w-28 flex py-2">
                        {user && comment.user_id === user.id && (
                    <>
                        <ul className="text-sm text-gray-700 dark:text-gray-500 w-28 items-center ">
                          <li>
                            <a href="#" onClick={() => handleEditComment(comment.id, comment.content)} className=" px-2 py-2 hover:bg-gray-200 dark:hover:text-gray p-2 flex items-center mb-2 relative">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                              Edit
                            </a>
                          </li>
                          <li>
                            <a href="#"  onClick={() => handleDeleteComment(comment.id, post.id)} className=" px-2 py-2 hover:bg-gray-200 dark:hover:text-gray p-2 flex items-center mb-2 relative">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              Delete
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    </div>
                  )}
                </div>
                </div>
 
                      {editingCommentId === comment.id ? (
                        <div>
                          <input
                            value={editCommentContent}
                            onChange={handleEditCommentContentChange}
                            className={`w-full px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2`}
                          />
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => handleUpdateComment(comment.id, post.id)}
                              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-full transition duration-200 text-white"
                            >
                              Update
                            </button>
                            <button
                              onClick={handleCancelComment}
                              className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-full transition duration-200 text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-2">{comment.content}</p>
                      )}
                    </div>
                  ))}
                  

                  <div className="mt-4">
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmitComment(post.id); }} className="flex items-center px-14">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentContent[post.id] || ''}
                        onChange={(e) => handleCommentChange(e, post.id)}
                        className={`py-1.5 rounded-lg justify-center px-20 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-primary bg-gray-200 text-gray-700 placeholder:text-gray-500 pl-20 ml-10 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <button
                        type="submit"
                        className="bg-cyan-500  ml-3 hover:bg-cyan-600 flex items-center justify-center rounded-full border border-primary bg-primary px-2 py-2 text-center text-base font-medium text-white"
                      >
                        Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
  );
};

export default Dashboard;
