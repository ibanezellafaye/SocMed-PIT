<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    // public function index()
    // {
    //     $user = Auth::user();
    //     $posts = Post::with(['user', 'comments.user', 'likes'])
    //                 ->whereIn('user_id', $user->follows()->pluck('followed_user_id'))
    //                 ->orWhere('user_id', $user->id)
    //                 ->orderBy('created_at', 'desc')
    //                 ->get();

    //     $posts->each(function($post) use ($user) {
    //         $post->likes_count = $post->likes()->count();
    //         $post->liked = $post->likes()->where('user_id', $user->id)->exists();
    //     });

    //     return response()->json($posts);
    // }

    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'content' => 'required|string',
    //     ]);

    //     $post = Post::create([
    //         'user_id' => Auth::id(),
    //         'content' => $validated['content'],
    //     ]);

    //     $post->load('user');
    //     $post->likes_count = 0; // Initial likes count
    //     $post->liked = false;   // Initial liked state

    //     return response()->json($post, 201);
    // }

    // public function update(Request $request, Post $post)
    // {
    //     $this->authorize('update', $post);

    //     $validated = $request->validate([
    //         'content' => 'required|string',
    //     ]);

    //     $post->update([
    //         'content' => $validated['content'],
    //     ]);

    //     $user = Auth::user();
    //     $post->load('user');
    //     $post->likes_count = $post->likes()->count();
    //     $post->liked = $post->likes()->where('user_id', $user->id)->exists();

    //     return response()->json($post);
    // }

    // public function destroy(Post $post)
    // {
    //     $this->authorize('delete', $post);
    //     $post->delete();

    //     return response()->json(['message' => 'Post deleted successfully']);
    // }

    // public function likePost($postId)
    // {
    //     $post = Post::findOrFail($postId);
    //     $user = Auth::user();

    //     // Check if the user has already liked the post
    //     if ($post->likes()->where('user_id', $user->id)->exists()) {
    //         return response()->json(['message' => 'Already liked this post'], 200);
    //     }

    //     $post->likes()->create(['user_id' => $user->id]);

    //     $post->load('likes'); // Load likes relationship
    //     return response()->json($post);
    // }

    // public function unlikePost($postId)
    // {
    //     $post = Post::findOrFail($postId);
    //     $user = Auth::user();

    //     // Check if the user has liked the post
    //     $like = $post->likes()->where('user_id', $user->id)->first();
    //     if ($like) {
    //         $like->delete();
    //     }

    //     $post->load('likes'); // Load likes relationship
    //     return response()->json($post);
    // }

    public function index(Request $request)
    {
        $user = Auth::user();
        $perPage = $request->input('per_page', 5); // Default to 5 posts per page
        $page = $request->input('page', 1);

        $posts = Post::with(['user', 'comments.user', 'likes'])
                    ->whereIn('user_id', $user->follows()->pluck('followed_user_id'))
                    ->orWhere('user_id', $user->id)
                    ->orderBy('created_at', 'desc')
                    ->paginate($perPage, ['*'], 'page', $page);

        $posts->each(function($post) use ($user) {
            $post->likes_count = $post->likes()->count();
            $post->liked = $post->likes()->where('user_id', $user->id)->exists();
        });

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'content' => $validated['content'],
        ]);

        $post->load('user');
        $post->likes_count = 0; // Initial likes count
        $post->liked = false;   // Initial liked state

        return response()->json($post, 201);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $post->update([
            'content' => $validated['content'],
        ]);

        $user = Auth::user();
        $post->load('user');
        $post->likes_count = $post->likes()->count();
        $post->liked = $post->likes()->where('user_id', $user->id)->exists();

        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function likePost($postId)
    {
        $post = Post::findOrFail($postId);
        $user = Auth::user();

        // Check if the user has already liked the post
        if ($post->likes()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Already liked this post'], 200);
        }

        $post->likes()->create(['user_id' => $user->id]);

        $post->load('likes'); // Load likes relationship
        return response()->json($post);
    }

    public function unlikePost($postId)
    {
        $post = Post::findOrFail($postId);
        $user = Auth::user();

        // Check if the user has liked the post
        $like = $post->likes()->where('user_id', $user->id)->first();
        if ($like) {
            $like->delete();
        }

        $post->load('likes'); // Load likes relationship
        return response()->json($post);
    }

}
