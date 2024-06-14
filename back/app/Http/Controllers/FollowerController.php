<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{
    public function follow(Request $request, $id)
    {
        $following = User::findOrFail($id);

        $existingFollow = Follower::where('follower_id', Auth::id())
            ->where('following_id', $id)
            ->first();

        if ($existingFollow) {
            return response()->json(['message' => 'Already following'], 400);
        }

        $follow = Follower::create([
            'follower_id' => Auth::id(),
            'following_id' => $id,
        ]);

        return response()->json(['message' => 'User followed', 'follow' => $follow]);
    }

    public function unfollow(Request $request, $id)
    {
        $following = User::findOrFail($id);

        $follow = Follower::where('follower_id', Auth::id())
            ->where('following_id', $id)
            ->first();

        if (!$follow) {
            return response()->json(['message' => 'Not following'], 400);
        }

        $follow->delete();

        return response()->json(['message' => 'User unfollowed']);
    }

    public function following($userId)
    {
        $user = User::findOrFail($userId);
        $following = Follower::where('follower_id', $userId)->with('following')->get();

        return response()->json($following);
    }

    public function followStatus($id)
    {
        $isFollowing = Follower::where('follower_id', Auth::id())
                                ->where('following_id', $id)
                                ->exists();

        return response()->json(['isFollowing' => $isFollowing]);
    }
}
