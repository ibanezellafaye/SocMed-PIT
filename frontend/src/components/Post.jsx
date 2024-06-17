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
import { Ellipsis } from "lucide-react";

const Post = ({ post, onEdit, onDelete, onLike, onUnlike, onCommentSubmit, onCommentEdit, onCommentDelete, isEditing, onCancel }) => {
  const { content, created_at, comments = [], likes, userHasLiked, user } = post;
  const [comment, setComment] = useState('');
  const [visibleComments, setVisibleComments] = useState(2);
  const [editingComment, setEditingComment] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);
  const [openCommentDropdowns, setOpenCommentDropdowns] = useState({});

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

  const togglePostDropdown = () => {
    setIsPostDropdownOpen(!isPostDropdownOpen);
  };

  const toggleCommentDropdown = (commentId) => {
    setOpenCommentDropdowns((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="post">
      <div className="post-header mb-2">
        <div className="flex items-center justify-between">
          <span className="post-date flex text-gray-600 text-xs ml-12 -mt-3">{new Date(created_at).toLocaleString()}</span>
          {user && user.id === loggedInUser.id && (
            <>
              <div className="mb-2 relative -mt-20 inline-flex items-center ">
                {isEditing ? (
                  <button onClick={onCancel} className=""></button>
                ) : (
                  <>
                    <button 
                      className="post-date text-gray-600 cursor-pointer hover:bg-gray-200 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center "
                      onClick={togglePostDropdown}
                    >
                      <Ellipsis />
                    </button>
                    {isPostDropdownOpen && (
                      <div className="absolute top-full left-0 bg-white rounded-lg w-28 flex py-2">
                        <ul className="text-sm text-gray-700 dark:text-gray-500 w-28 items-center ">
                          <li>
                            <a href="#" onClick={onEdit} className=" px-2 py-2 hover:bg-gray-200 dark:hover:text-gray p-2 flex items-center mb-2 relative">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                              Edit
                            </a>
                          </li>
                          <li>
                            <a href="#" onClick={onDelete} className=" px-2 py-2 hover:bg-gray-200 dark:hover:text-gray p-2 flex items-center mb-2 relative">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="post-content mb-2">
        <p className='text-base width-auto font-medium flex-shrink mt-3 mb-2.5 ml-2'>{content}</p>
        <div className="flex items-center -ml-2">
          {userHasLiked ? (
            <button onClick={onUnlike} className="stroke-red-500 text-red-200 flex items-center px-2 py-1  ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9 fill-red-600 hover:bg-red-200 rounded-full px-2 py-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span className='text-gray-700 '>{likes}</span>
            </button>
          ) : (
            <button onClick={onLike} className=" flex items-center px-2 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9 stroke-gray-500 text-gray-200 hover:bg-gray-200 rounded-full px-2 py-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span className='text-gray-700'>{likes}</span>
            </button>
          )}
        </div>
      </div>
      <div className="post-comments mb-2 ">
      {Array.isArray(comments) && comments.slice(0, visibleComments).map((comment) => (
  <div key={comment.id} className="comment p-2 border-t flex relative">
    {comment.user.profile_picture && (
      <img src={`http://localhost:8000/storage/${comment.user.profile_picture}`} alt="Profile" className="w-8 h-8 rounded-full mr-2 " />
    )}
    <div className="flex-grow">
      <p>
        <span className="font-bold">{comment.user?.first_name} {comment.user?.last_name}:</span>
        <span> {comment.comment} </span>
        <span className="post-date flex text-gray-600 text-xs">{new Date(comment.created_at).toLocaleString()}</span>
      </p>
    </div>
    {comment.user_id === loggedInUser.id && (
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <button
          className="text-gray-600 cursor-pointer hover:bg-gray-200 font-medium rounded-lg text-sm px-1  text-center inline-flex items-center "
          onClick={() => toggleCommentDropdown(comment.id)}
        >
          <Ellipsis />
        </button>
        {openCommentDropdowns[comment.id] && (
          <div className="absolute top-full left-0 bg-white rounded-lg w-28 flex py-2  dropdown dropdown-bottom">
            <ul className="text-sm text-gray-700 dark:text-gray-500 w-28 items-center ">
              <li>
                <a href="#" onClick={() => handleEditComment(comment)} className=" px-2 py-2 hover:bg-gray-200 dark:hover:text-gray p-2 flex items-center mb-2 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  Edit
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleCommentDelete(comment.id)} className=" px-2 py-2 hover:bg-gray-200 dark:hover:text-gray p-2 flex items-center mb-2 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
))}

        {Array.isArray(comments) && comments.length > visibleComments && (
          <button onClick={handleLoadMoreComments} className=" ml-8 -mt-3 text-gray-900 px-4 py-2 rounded font-semibold post-date flex text-xs">View more comments...</button>
        )}
      </div>
      <form onSubmit={handleCommentSubmit} className="flex items-center px-14">
        <input
          type="text"
          placeholder="Add a comment"
          value={editingComment ? editedCommentContent : comment}
          onChange={editingComment ? (e) => setEditedCommentContent(e.target.value) : handleCommentChange}
          className=" mx-auto flex-grow py-2 rounded-lg justify-center px-20 cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-primary bg-gray-200 text-gray-700 placeholder:text-gray-500"
        />
        <button type="submit" className=" bg-cyan-500  ml-3 hover:bg-cyan-600 flex items-center justify-center rounded-lg border border-primary bg-primary px-2 py-2 text-center text-base font-medium text-white">
          {editingComment ? 'Update' : 'Comment'}
        </button>
        {editingComment && <button onClick={() => setEditingComment(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
      </form>
    </div>
  );
};

export default Post;

