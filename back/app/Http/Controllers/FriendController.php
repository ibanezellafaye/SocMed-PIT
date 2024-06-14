<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class FriendController extends Controller
{
    /**
     * Send a friend request.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $friendId
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendRequest(Request $request, $friendId)
    {
        $friend = User::findOrFail($friendId);

        $existingFriend = Friend::where('user_id', Auth::id())
                                 ->where('friend_id', $friendId)
                                 ->first();

        if ($existingFriend) {
            return response()->json(['message' => 'Friend request already sent or already friends'], 400);
        }

        $friendRequest = Friend::create([
            'user_id' => Auth::id(),
            'friend_id' => $friendId,
        ]);

        return response()->json(['message' => 'Friend request sent', 'friendRequest' => $friendRequest]);
    }

    /**
     * Accept a friend request.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $friendId
     * @return \Illuminate\Http\JsonResponse
     */
    public function acceptRequest(Request $request, $friendId)
    {
        $friendRequest = Friend::where('user_id', $friendId)
                               ->where('friend_id', Auth::id())
                               ->first();

        if (!$friendRequest) {
            return response()->json(['message' => 'Friend request not found'], 404);
        }

        $friendRequest->update([
            'accepted_at' => Carbon::now(),
        ]);

        return response()->json(['message' => 'Friend request accepted', 'friend' => $friendRequest]);
    }

    /**
     * Decline a friend request.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $friendId
     * @return \Illuminate\Http\JsonResponse
     */
    public function declineRequest(Request $request, $friendId)
    {
        $friendRequest = Friend::where('user_id', $friendId)
                               ->where('friend_id', Auth::id())
                               ->first();

        if (!$friendRequest) {
            return response()->json(['message' => 'Friend request not found'], 404);
        }

        $friendRequest->delete();

        return response()->json(['message' => 'Friend request declined']);
    }

    /**
     * Get a list of friends for a user.
     *
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function friends($userId)
    {
        $user = User::findOrFail($userId);
        $friends = Friend::where(function ($query) use ($userId) {
            $query->where('user_id', $userId)
                  ->orWhere('friend_id', $userId);
        })->whereNotNull('accepted_at')
          ->with(['user', 'friend'])
          ->get();

        return response()->json($friends);
    }
}
