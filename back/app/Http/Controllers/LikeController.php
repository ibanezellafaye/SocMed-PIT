<?php

namespace App\Http\Controllers;

use App\Models\Likes;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Like a post.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function like(Request $request, $postId)
    {
        $post = Post::findOrFail($postId);

        $like = Likes::where('post_id', $postId)->where('user_id', Auth::id())->first();
        if ($like) {
            return response()->json(['message' => 'Already liked'], 400);
        }

        $like = Likes::create([
            'post_id' => $postId,
            'user_id' => Auth::id(),
        ]);

        return response()->json(['message' => 'Post liked', 'likes' => $post->likes()->count()]);
    }

    /**
     * Unlike a post.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function unlike(Request $request, $postId)
    {
        $post = Post::findOrFail($postId);

        $like = Likes::where('post_id', $postId)->where('user_id', Auth::id())->first();
        if (!$like) {
            return response()->json(['message' => 'Not liked yet'], 400);
        }

        $like->delete();

        return response()->json(['message' => 'Post unliked', 'likes' => $post->likes()->count()]);
    }

    /**
     * Get likes for a post.
     *
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLikes($postId)
    {
        $post = Post::findOrFail($postId);
        $likes = $post->likes()->count();
        $userHasLiked = $post->likes()->where('user_id', Auth::id())->exists();

        return response()->json([
            'likes' => $likes,
            'userHasLiked' => $userHasLiked
        ]);
    }
}
