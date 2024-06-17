<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function likePost($id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();

        $like = $post->likes()->where('user_id', $user->id)->first();

        if ($like) {
            // Unlike the post
            $like->delete();
            $post->loadCount('likes'); // Update the likes count
            return response()->json(['likes_count' => $post->likes_count, 'liked' => false], 200);
        } else {
            // Like the post
            $like = new Like();
            $like->user_id = $user->id;
            $like->post_id = $post->id;
            $like->save();
            $post->loadCount('likes'); // Update the likes count
            return response()->json(['likes_count' => $post->likes_count, 'liked' => true], 200);
        }
    }
}
