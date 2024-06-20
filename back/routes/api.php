<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\MessageController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('posts', [PostController::class, 'index']);
    Route::post('posts', [PostController::class, 'store']);
    Route::get('posts/{post}', [PostController::class, 'show']);
    Route::put('posts/{post}', [PostController::class, 'update']);
    Route::delete('posts/{post}', [PostController::class, 'destroy']);

    Route::post('/follow', [FollowController::class, 'follow']);
    Route::post('/unfollow', [FollowController::class, 'unfollow']);
    Route::get('/following', [FollowController::class, 'getFollowing']);
    Route::get('/followers', [FollowController::class, 'getFollowers']);

    Route::post('posts/{post}/comments', [CommentController::class, 'store']);
    Route::put('comments/{comment}', [CommentController::class, 'update']);
    Route::delete('comments/{comment}', [CommentController::class, 'destroy']);

    Route::post('/posts/{id}/like', [LikeController::class, 'likePost']);

    Route::get('notifications', [NotificationController::class, 'index']);
    Route::post('notifications/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::delete('notifications/{id}', [NotificationController::class, 'destroy']);

    Route::get('/messages/conversations', [MessageController::class, 'conversations']);
    Route::get('/messages/{userId}', [MessageController::class, 'index']);
    Route::post('/messages/{userId}', [MessageController::class, 'store']);

    Route::get('/search', [UserController::class, 'search']);
    Route::get('/user', [UserController::class, 'getUser']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::get('users/{id}/posts', [UserController::class, 'posts']);

    Route::put('/update', [UserController::class, 'update']);
    Route::post('/user/change-password', [UserController::class, 'changePassword']);
    Route::post('/user/upload-profile-image', [UserController::class, 'uploadProfileImage']);

    Route::get('/user/posts', [UserController::class, 'getUserPosts']);
});

