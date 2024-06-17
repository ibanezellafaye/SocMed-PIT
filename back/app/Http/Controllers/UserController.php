<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        $userId = Auth::id();

        $users = User::where('id', '!=', $userId)
            ->where(function ($q) use ($query) {
                if ($query) {
                    $q->where('first_name', 'like', "%{$query}%")
                      ->orWhere('last_name', 'like', "%{$query}%")
                      ->orWhere('email', 'like', "%{$query}%");
                }
            })->get();

        return response()->json($users);
    }

    public function getUser()
    {
        $user = Auth::user();
        return response()->json(['name' => $user->name]);
    }

    // public function show($id)
    // {
    //     $user = User::findOrFail($id);
    //     return response()->json($user);
    // }

    public function show($id)
    {
        $user = User::with('posts')->findOrFail($id);
        return response()->json($user);
    }

    public function posts($id)
    {
        $posts = Post::where('user_id', $id)->get();
        return response()->json($posts);
    }
}
