// import React, { useState } from 'react';

// const Post = ({ post, onEdit, onDelete, onLike, onUnlike, onCommentSubmit, onCommentEdit, onCommentDelete, isEditing, onCancel }) => {
//   const { content, created_at, comments = [], likes, userHasLiked, user } = post;
//   const [comment, setComment] = useState('');
//   const [visibleComments, setVisibleComments] = useState(2);
//   const [editingComment, setEditingComment] = useState(null);
//   const [editedCommentContent, setEditedCommentContent] = useState('');

//   const loggedInUser = JSON.parse(localStorage.getItem('user'));

//   const handleCommentChange = (e) => {
//     setComment(e.target.value);
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (editingComment) {
//       onCommentEdit(editingComment.id, editedCommentContent);
//       setEditingComment(null);
//       setEditedCommentContent('');
//     } else {
//       onCommentSubmit(comment);
//       setComment('');
//     }
//   };

//   const handleCommentDelete = (commentId) => {
//     onCommentDelete(commentId);
//   };

//   const handleEditComment = (comment) => {
//     setEditingComment(comment);
//     setEditedCommentContent(comment.comment);
//   };

//   const handleLoadMoreComments = () => {
//     setVisibleComments((prevVisibleComments) => prevVisibleComments + 2);
//   };

//   return (
//     <div className="post">
//       <div className="post-header mb-2">
//         <span className="post-date text-gray-600">{new Date(created_at).toLocaleString()}</span>
//         {user && user.id === loggedInUser.id && (
//           <>
//             {isEditing ? (
//               <button onClick={onCancel} className="bg-gray-500 text-white px-2 py-1 rounded ml-2">Cancel</button>
//             ) : (
//               <>
//                 <button onClick={onEdit} className="bg-yellow-500 text-white px-2 py-1 rounded ml-2">Edit</button>
//                 <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
//               </>
//             )}
//           </>
//         )}
//       </div>
//       <div className="post-content mb-2">
//         <p>{content}</p>
//         <div className="flex items-center">
//           <span className="mr-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
//           {userHasLiked ? (
//             <button onClick={onUnlike} className="bg-red-500 text-white px-2 py-1 rounded">Unlike</button>
//           ) : (
//             <button onClick={onLike} className="bg-blue-500 text-white px-2 py-1 rounded">Like</button>
//           )}
//         </div>
//       </div>
//       <div className="post-comments mb-2">
//         {Array.isArray(comments) && comments.slice(0, visibleComments).map((comment) => (
//           <div key={comment.id} className="comment p-2 border-t">
//             <p>
//               <span className="text-gray-500 text-sm ml-2">{new Date(comment.created_at).toLocaleString()}</span>
//               <span> | </span>
//               <span className="font-bold">{comment.user?.first_name} {comment.user?.last_name}:</span> {comment.comment}
//               {comment.user_id === loggedInUser.id && (
//                 <>
//                   <button onClick={() => handleEditComment(comment)} className="bg-yellow-500 text-white px-2 py-1 rounded ml-2">Edit</button>
//                   <button onClick={() => handleCommentDelete(comment.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
//                 </>
//               )}
//             </p>
//           </div>
//         ))}
//         {Array.isArray(comments) && comments.length > visibleComments && (
//           <button onClick={handleLoadMoreComments} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-2">Load More</button>
//         )}
//       </div>
//       <form onSubmit={handleCommentSubmit} className="flex items-center">
//         <input
//           type="text"
//           placeholder="Add a comment"
//           value={editingComment ? editedCommentContent : comment}
//           onChange={editingComment ? (e) => setEditedCommentContent(e.target.value) : handleCommentChange}
//           className="flex-grow p-2 border rounded"
//         />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded ml-2">
//           {editingComment ? 'Update' : 'Comment'}
//         </button>
//         {editingComment && <button onClick={() => setEditingComment(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
//       </form>
//     </div>
//   );
// };

// export default Post;


import React, { useState } from 'react';

const Post = ({ post, onEdit, onDelete, onLike, onUnlike, onCommentSubmit, onCommentEdit, onCommentDelete, isEditing, onCancel }) => {
  const { content, created_at, comments = [], likes, userHasLiked, user } = post;
  const [comment, setComment] = useState('');
  const [visibleComments, setVisibleComments] = useState(2);
  const [editingComment, setEditingComment] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (editingComment) {
      onCommentEdit(editingComment.id, editedCommentContent);
      setEditingComment(null);
      setEditedCommentContent('');
    } else {
      onCommentSubmit(comment);
      setComment('');
    }
  };

  const handleCommentDelete = (commentId) => {
    onCommentDelete(commentId);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditedCommentContent(comment.comment);
  };

  const handleLoadMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 2);
  };

  return (
    <div className="post">
      <div className="post-header mb-2">
        <div className="flex items-center">
          
          <span className="post-date text-gray-600 text-xs ml-12 -mt-5">{new Date(created_at).toLocaleString()}</span>
          {user && user.id === loggedInUser.id && (
            <>
              {isEditing ? (
                <button onClick={onCancel} className="bg-gray-500 text-white px-2 py-1 rounded ml-2">Cancel</button>
              ) : (
                <>
                  <button onClick={onEdit} className="bg-yellow-500 text-white px-2 py-1 rounded ml-2">Edit</button>
                  <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="post-content mb-2">
        <p>{content}</p>
        <div className="flex items-center">
          <span className="mr-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
          {userHasLiked ? (
            <button onClick={onUnlike} className="bg-red-500 text-white px-2 py-1 rounded">Unlike</button>
          ) : (
            <button onClick={onLike} className="bg-blue-500 text-white px-2 py-1 rounded">Like</button>
          )}
        </div>
      </div>
      <div className="post-comments mb-2">
        {Array.isArray(comments) && comments.slice(0, visibleComments).map((comment) => (
          <div key={comment.id} className="comment p-2 border-t flex items-center">
            {comment.user.profile_picture && (
              <img src={`http://localhost:8000/storage/${comment.user.profile_picture}`} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
            )}
            <div>
              <p>
                <span className="text-gray-500 text-sm ml-2">{new Date(comment.created_at).toLocaleString()}</span>
                <span> | </span>
                <span className="font-bold">{comment.user?.first_name} {comment.user?.last_name}:</span> {comment.comment}
                {comment.user_id === loggedInUser.id && (
                  <>
                    <button onClick={() => handleEditComment(comment)} className="bg-yellow-500 text-white px-2 py-1 rounded ml-2">Edit</button>
                    <button onClick={() => handleCommentDelete(comment.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
        {Array.isArray(comments) && comments.length > visibleComments && (
          <button onClick={handleLoadMoreComments} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-2">Load More</button>
        )}
      </div>
      <form onSubmit={handleCommentSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Add a comment"
          value={editingComment ? editedCommentContent : comment}
          onChange={editingComment ? (e) => setEditedCommentContent(e.target.value) : handleCommentChange}
          className="flex-grow p-2 border rounded border-gray-700 bg-gray-700"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded ml-2">
          {editingComment ? 'Update' : 'Comment'}
        </button>
        {editingComment && <button onClick={() => setEditingComment(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
      </form>
    </div>
  );
};

export default Post;
