import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './App';
import moment from 'moment';

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
      // Include the user and created_at fields in the updated comment
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

  if (!user) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className={`flex-1 flex flex-col ml-72 mt-20 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={handleContentChange}
          className={`w-full h-32 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
        >
          Post
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={post.id} ref={index === posts.length - 1 ? lastPostElementRef : null} className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-md shadow-md`}>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                {post.user && `${post.user.first_name} ${post.user.last_name} on ${moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}
              </div>
              {post.user_id === user.id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(post.id, post.content)}
                    className="py-1 px-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="py-1 px-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            {editingPostId === post.id ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={handleEditContentChange}
                  className={`w-full h-32 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleUpdate(post.id)}
                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancel}
                    className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md transition duration-200 text-white"
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
                className={`py-1 px-2 rounded-md text-white ${post.liked ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {post.liked ? 'Unlike' : 'Like'}
              </button>
              <span>{post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}</span>
            </div>
            <div className="mt-4 space-y-2">
              {(post.comments || []).map((comment) => (
                <div key={comment.id} className={`p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md`}>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {comment.user && `${comment.user.first_name} ${comment.user.last_name} on ${moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}
                    </div>
                    {comment.user_id === user.id && editingCommentId !== comment.id && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditComment(comment.id, comment.content)}
                          className="py-1 px-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id, post.id)}
                          className="py-1 px-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  {editingCommentId === comment.id ? (
                    <div>
                      <textarea
                        value={editCommentContent}
                        onChange={handleEditCommentContentChange}
                        className={`w-full h-20 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2`}
                      />
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleUpdateComment(comment.id, post.id)}
                          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-white"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancelComment}
                          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md transition duration-200 text-white"
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
                <form onSubmit={(e) => { e.preventDefault(); handleSubmitComment(post.id); }} className="space-y-2">
                  <textarea
                    placeholder="Add a comment..."
                    value={commentContent[post.id] || ''}
                    onChange={(e) => handleCommentChange(e, post.id)}
                    className={`w-full px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-white"
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
  );
};

export default Dashboard;
