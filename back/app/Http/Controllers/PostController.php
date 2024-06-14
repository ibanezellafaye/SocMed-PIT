<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $posts = Post::with('user')->get();
        return response()->json($posts);
    }

    /**
     * Store a newly created post in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);

        return response()->json($post, 201);
    }

    /**
     * Display the specified post.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $post = Post::with('user')->findOrFail($id);
        return response()->json($post);
    }

    /**
     * Update the specified post in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->update($request->all());

        return response()->json($post);
    }

    /**
     * Remove the specified post from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted']);
    }

    /**
     * Like the specified post.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function like($id)
    {
        $post = Post::findOrFail($id);
        $post->increment('likes');

        return response()->json(['message' => 'Post liked', 'likes' => $post->likes]);
    }

    /**
     * Unlike the specified post.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function unlike($id)
    {
        $post = Post::findOrFail($id);
        if ($post->likes > 0) {
            $post->decrement('likes');
        }

        return response()->json(['message' => 'Post unliked', 'likes' => $post->likes]);
    }

    public function getPostsByUser($userId)
    {
        $posts = Post::where('user_id', $userId)->get();
        return response()->json($posts);
    }

    
}
