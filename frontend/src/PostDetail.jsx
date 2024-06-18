import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from './App';
import moment from 'moment';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [editingPost, setEditingPost] = useState(false);
  const [editPostContent, setEditPostContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');
    if (storedUser && authToken) {
      setUser(JSON.parse(storedUser));
      fetchPost(authToken);
    } else {
      navigate('/login');
    }
  }, [navigate, postId]);

  const fetchPost = async (authToken) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to fetch post. Please try again.');
    }
  };

  const handleEditPost = () => {
    setEditingPost(true);
    setEditPostContent(post.content);
  };

  const handleEditPostContentChange = (e) => setEditPostContent(e.target.value);

  const handleUpdatePost = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/${postId}`,
        { content: editPostContent },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setPost(prevPost => ({
        ...prevPost,
        content: response.data.content, // Update the post content
      }));
      setEditingPost(false);
      setEditPostContent('');
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    }
  };

  const handleCancelPostEdit = () => {
    setEditingPost(false);
    setEditPostContent('');
  };

  const handleDeletePost = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again.');
    }
  };

  const handleCommentChange = (e) => setCommentContent(e.target.value);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/comments`,
        { content: commentContent },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setPost(prevPost => ({ ...prevPost, comments: [...prevPost.comments, response.data] }));
      setCommentContent('');
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

  const handleUpdateComment = async (commentId) => {
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
      const updatedComment = response.data;
      const originalComment = post.comments.find(comment => comment.id === commentId);
      setPost(prevPost => ({
        ...prevPost,
        comments: prevPost.comments.map(comment =>
          comment.id === commentId ? { ...updatedComment, user: originalComment.user, created_at: originalComment.created_at } : comment
        ),
      }));
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

  const handleDeleteComment = async (commentId) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPost(prevPost => ({
        ...prevPost,
        comments: prevPost.comments.filter(comment => comment.id !== commentId),
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLike = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setPost(prevPost => ({
        ...prevPost,
        likes_count: response.data.likes_count,
        liked: response.data.liked,
      }));
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      setError('Failed to like/unlike post. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='ml-72 mt-20'>
      <button
        onClick={handleBack}
        className="mb-4 mt-2 ml-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
      >
        Back
      </button>

    <div className={`flex-1 flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      
      <div className="p-4">
        <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-md shadow-md`}>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">
              {post.user && `${post.user.first_name} ${post.user.last_name} on ${moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}
            </div>
            {post.user_id === user.id && !editingPost && (
              <div className="flex space-x-2">
                <button
                  onClick={handleEditPost}
                  className="py-1 px-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeletePost}
                  className="py-1 px-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          {editingPost ? (
            <div>
              <textarea
                value={editPostContent}
                onChange={handleEditPostContentChange}
                className={`w-full h-32 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleUpdatePost}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-white"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelPostEdit}
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
              onClick={handleLike}
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
                        onClick={() => handleDeleteComment(comment.id)}
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
                        onClick={() => handleUpdateComment(comment.id)}
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
              <form onSubmit={handleSubmitComment} className="space-y-2">
                <textarea
                  placeholder="Add a comment..."
                  value={commentContent}
                  onChange={handleCommentChange}
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
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
    </div>
    </div>
  );
};

export default PostDetail;
