<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\UserController;
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\PostController;
// use App\Http\Controllers\CommentController;
// use App\Http\Controllers\LikeController;
// use App\Http\Controllers\FollowerController;
// use App\Http\Controllers\MessageController;
// use App\Http\Controllers\NotificationController;

// // Register and Login routes
// Route::post('/users', [UserController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);

// // Post routes
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/posts/user/{userId}', [PostController::class, 'getPostsByUser']);
//     Route::get('/posts', [PostController::class, 'index']);
//     Route::post('/posts', [PostController::class, 'store']);
//     Route::get('/posts/{id}', [PostController::class, 'show']);
//     Route::put('/posts/{id}', [PostController::class, 'update']);
//     Route::delete('/posts/{id}', [PostController::class, 'destroy']);
// });

// // Comment routes
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/posts/{postId}/comments', [CommentController::class, 'index']);
//     Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
//     Route::put('/comments/{id}', [CommentController::class, 'update']);
//     Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
// });

// // Like routes
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/posts/{postId}/like', [LikeController::class, 'like']);
//     Route::post('/posts/{postId}/unlike', [LikeController::class, 'unlike']);
//     Route::get('/posts/{postId}/likes', [LikeController::class, 'getLikes']);
// });

// // Follower routes
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/users/{id}/follow', [FollowerController::class, 'follow']);
//     Route::post('/users/{id}/unfollow', [FollowerController::class, 'unfollow']);
//     Route::get('/users/{id}/follow-status', [FollowerController::class, 'followStatus']);
//     Route::get('/users/{userId}/followers', [FollowerController::class, 'followers']);
//     Route::get('/users/{userId}/following', [FollowerController::class, 'following']);
// });

// // Message routes
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/messages/users', [MessageController::class, 'getMessagedUsers']);
//     Route::get('/messages/{followingId}', [MessageController::class, 'index']);
//     Route::post('/messages', [MessageController::class, 'store']);
//     Route::patch('messages/{messageId}/read', [MessageController::class, 'markAsRead']);
//     Route::patch('messages/{messageId}/unread', [MessageController::class, 'markAsUnread']);

//     Route::get('notifications', [NotificationController::class, 'index']);
//     Route::patch('notifications/{notificationId}/read', [NotificationController::class, 'markAsRead']);
//     Route::delete('notifications/{notificationId}', [NotificationController::class, 'destroy']);
//     Route::delete('/notifications/conversation/{senderId}', [NotificationController::class, 'deleteConversationNotifications']);
// });

// // User routes
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/users', [UserController::class, 'search']);
//     Route::put('/users/{id}', [UserController::class, 'update']);
//     Route::get('/users/{id}', [UserController::class, 'show']);
//     Route::put('/user/password', [UserController::class, 'changePassword']);
//     Route::post('/users/{id}/upload-profile-picture', [UserController::class, 'uploadProfilePicture']);

// });


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;

// Register and Login routes
Route::post('/users', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Post routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts/user/{userId}', [PostController::class, 'getPostsByUser']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});

// Comment routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts/{postId}/comments', [CommentController::class, 'index']);
    Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
});

// Like routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts/{postId}/like', [LikeController::class, 'like']);
    Route::post('/posts/{postId}/unlike', [LikeController::class, 'unlike']);
    Route::get('/posts/{postId}/likes', [LikeController::class, 'getLikes']);
});

// Follower routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/users/{id}/follow', [FollowerController::class, 'follow']);
    Route::post('/users/{id}/unfollow', [FollowerController::class, 'unfollow']);
    Route::get('/users/{id}/follow-status', [FollowerController::class, 'followStatus']);
    Route::get('/users/{userId}/followers', [FollowerController::class, 'followers']);
    Route::get('/users/{userId}/following', [FollowerController::class, 'following']);
});

// Message routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages/users', [MessageController::class, 'getMessagedUsers']);
    Route::get('/messages/{followingId}', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::patch('messages/{messageId}/read', [MessageController::class, 'markAsRead']);
    Route::patch('messages/{messageId}/unread', [MessageController::class, 'markAsUnread']);

    Route::get('notifications', [NotificationController::class, 'index']);
    Route::patch('notifications/{notificationId}/read', [NotificationController::class, 'markAsRead']);
    Route::delete('notifications/{notificationId}', [NotificationController::class, 'destroy']);
    Route::delete('/notifications/conversation/{senderId}', [NotificationController::class, 'deleteConversationNotifications']);
});

// User routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'getAuthenticatedUser']); // Updated route for fetching authenticated user details
    Route::put('/users/{id}', [UserController::class, 'update']);
    // Route::put('/user', [UserController::class, 'update']); // Updated route for updating authenticated user details
    Route::get('/users', [UserController::class, 'search']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/user/password', [UserController::class, 'changePassword']); // Updated route for changing password
    Route::post('/users/{id}/upload-profile-picture', [UserController::class, 'uploadProfilePicture']);
});
