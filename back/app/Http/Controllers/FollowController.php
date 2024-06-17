<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FollowController extends Controller
{
    public function follow(Request $request)
    {
        $user = Auth::user();
        $followedUser = User::findOrFail($request->user_id);

        // Check if the user is already following the other user
        if ($user->follows()->where('followed_user_id', $followedUser->id)->exists()) {
            return response()->json(['message' => 'Already following this user'], 200);
        }

        $user->follows()->attach($followedUser->id);

        return response()->json(['message' => 'User followed successfully'], 200);
    }

    public function unfollow(Request $request)
    {
        $user = Auth::user();
        $unfollowedUser = User::findOrFail($request->user_id);

        // Check if the user is following the other user
        if (!$user->follows()->where('followed_user_id', $unfollowedUser->id)->exists()) {
            return response()->json(['message' => 'Not following this user'], 200);
        }

        $user->follows()->detach($unfollowedUser->id);

        return response()->json(['message' => 'User unfollowed successfully'], 200);
    }

    public function getFollowing()
    {
        $user = Auth::user();
        $following = $user->follows()->pluck('followed_user_id');

        return response()->json($following);
    }
}
