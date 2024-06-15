// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ViewProfile = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/users/${id}`);
//         setUser(response.data);

//         // Check if the current user is following this user
//         const followResponse = await axios.get(`http://localhost:8000/api/users/${id}/follow-status`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//           },
//         });
//         setIsFollowing(followResponse.data.isFollowing);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         if (error.response && error.response.status === 401) {
//           navigate('/login');
//         }
//       }
//     };

//     fetchUser();
//   }, [id, navigate]);

//   const handleFollow = async () => {
//     try {
//       await axios.post(`http://localhost:8000/api/users/${id}/follow`, {}, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });
//       setIsFollowing(true);
//     } catch (error) {
//       console.error('Error following user:', error);
//     }
//   };

//   const handleUnfollow = async () => {
//     try {
//       await axios.post(`http://localhost:8000/api/users/${id}/unfollow`, {}, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });
//       setIsFollowing(false);
//     } catch (error) {
//       console.error('Error unfollowing user:', error);
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>First Name:</strong> {user.first_name}</p>
//       <p><strong>Last Name:</strong> {user.last_name}</p>
//       <p><strong>Address:</strong> {user.address}</p>
//       <p><strong>Birth Date:</strong> {user.birthdate}</p>
//       <p><strong>Gender:</strong> {user.gender}</p>

//       {isFollowing ? (
//         <button onClick={handleUnfollow}>Unfollow</button>
//       ) : (
//         <button onClick={handleFollow}>Follow</button>
//       )}
//       <div>
//         <button onClick={() => navigate(-1)}>Back</button>
//       </div>
//     </div>
//   );
// };

// export default ViewProfile;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Post from './Post';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setUser(response.data);
    } catch (error) {
      setError('Error fetching user profile');
    }
  };

  const fetchPosts = useCallback(debounce(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/posts/user/${userId}`, {
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
  }, 300), [userId]);

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8000/api/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
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
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-64 mt-10">
      {error && <p className="text-red-500">{error}</p>}
      {user ? (
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={`http://localhost:8000/storage/${user.profile_picture}`}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
            />
            <div>
              <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Age:</strong> {calculateAge(user.birthdate)}</p>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Posts</h3>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="mb-4 p-4 border border-gray-700 rounded shadow-sm bg-gray-800">
                <div className="flex items-center mb-2">
                  {post.user?.profile_picture && (
                    <img src={`http://localhost:8000/storage/${post.user.profile_picture}`} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                  )}
                  <p className="font-bold">{post.user?.first_name} {post.user?.last_name}</p>
                </div>
                {post.image && (
                  <div className="my-2">
                    <img src={`http://localhost:8000/storage/${post.image}`} alt="Post" className="max-w-full h-auto" />
                  </div>
                )}
                <Post
                  post={post}
                  onLike={() => handleLike(post.id)}
                  onUnlike={() => handleUnlike(post.id)}
                  onCommentSubmit={(comment) => handleCommentSubmit(post.id, comment)}
                  onCommentEdit={(commentId, newContent) => handleCommentEdit(commentId, newContent)}
                  onCommentDelete={(commentId) => handleCommentDelete(commentId)}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default Profile;
