<?php

// namespace App\Http\Controllers;

// use App\Models\Comment;
// use App\Models\Post;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class CommentController extends Controller
// {
//     /**
//      * Display a listing of the comments for a specific post.
//      *
//      * @param int $postId
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function index($postId)
//     {
//         $post = Post::findOrFail($postId);
//         $comments = $post->comments()->with('user')->get();
//         return response()->json($comments);
//     }

//     /**
//      * Store a newly created comment in storage.
//      *
//      * @param \Illuminate\Http\Request $request
//      * @param int $postId
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function store(Request $request, $postId)
//     {
//         $post = Post::findOrFail($postId);

//         $comment = $post->comments()->create([
//             'user_id' => Auth::id(),
//             'comment' => $request->comment,
//         ]);

//         return response()->json($comment, 201);
//     }

//     /**
//      * Update the specified comment in storage.
//      *
//      * @param \Illuminate\Http\Request $request
//      * @param int $id
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function update(Request $request, $id)
//     {
//         $comment = Comment::findOrFail($id);

//         if ($comment->user_id !== Auth::id()) {
//             return response()->json(['error' => 'Unauthorized'], 403);
//         }

//         $comment->update($request->only('comment'));

//         return response()->json($comment);
//     }

//     /**
//      * Remove the specified comment from storage.
//      *
//      * @param int $id
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function destroy($id)
//     {
//         $comment = Comment::findOrFail($id);

//         if ($comment->user_id !== Auth::id()) {
//             return response()->json(['error' => 'Unauthorized'], 403);
//         }

//         $comment->delete();

//         return response()->json(['message' => 'Comment deleted']);
//     }
// }


namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index($postId)
    {
        $comments = Comment::with('user')
            ->where('post_id', $postId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|string',
            'post_id' => 'required|exists:posts,id',
        ]);

        $comment = Comment::create([
            'comment' => $request->comment,
            'post_id' => $request->post_id,
            'user_id' => Auth::id(),
        ]);

        // Load the user relationship
        $comment->load('user');

        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required|string',
        ]);

        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->update($request->all());

        // Load the user relationship
        $comment->load('user');

        return response()->json($comment);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted']);
    }
}

