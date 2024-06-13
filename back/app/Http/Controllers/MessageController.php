<?php

// namespace App\Http\Controllers;

// use App\Models\Message;
// use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class MessageController extends Controller
// {
//     public function index($followingId)
//     {
//         $user = Auth::user();
//         $messages = Message::where(function($query) use ($user, $followingId) {
//             $query->where('sender_id', $user->id)
//                   ->orWhere('receiver_id', $user->id);
//         })->where(function($query) use ($followingId) {
//             $query->where('sender_id', $followingId)
//                   ->orWhere('receiver_id', $followingId);
//         })->with('sender', 'receiver')
//           ->orderBy('created_at', 'asc')
//           ->get();

//         return response()->json($messages);
//     }

//     public function store(Request $request)
//     {
//         $request->validate([
//             'sender_id' => 'required|exists:users,id',
//             'receiver_id' => 'required|exists:users,id',
//             'message' => 'required|string',
//         ]);

//         $message = Message::create($request->all());

//         return response()->json($message, 201);
//     }

//     public function getMessagedUsers()
//     {
//         $user = Auth::user();

//         // Fetch unique user IDs of users the current user has messaged or received messages from
//         $messagedUserIds = Message::where('sender_id', $user->id)
//             ->orWhere('receiver_id', $user->id)
//             ->pluck('sender_id', 'receiver_id')
//             ->unique()
//             ->flatten()
//             ->toArray();

//         // Ensure the user is excluded from the list of users
//         $messagedUserIds = array_filter($messagedUserIds, function($id) use ($user) {
//             return $id != $user->id;
//         });

//         $users = User::whereIn('id', $messagedUserIds)->get();

//         return response()->json($users);
//     }
// }


namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class MessageController extends Controller
{
    public function index($followingId)
    {
        $user = Auth::user();
        $messages = Message::where(function($query) use ($user, $followingId) {
            $query->where('sender_id', $user->id)
                  ->orWhere('receiver_id', $user->id);
        })->where(function($query) use ($followingId) {
            $query->where('sender_id', $followingId)
                  ->orWhere('receiver_id', $followingId);
        })->with('sender', 'receiver')
          ->orderBy('created_at', 'asc')
          ->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $message = Message::create($request->all());

        return response()->json($message, 201);
    }

    public function getMessagedUsers()
    {
        $user = Auth::user();
        
        // Get the list of user IDs with whom the authenticated user has had conversations
        $messagedUserIds = Message::where('sender_id', $user->id)
            ->orWhere('receiver_id', $user->id)
            ->select('sender_id', 'receiver_id')
            ->get()
            ->flatMap(function ($message) use ($user) {
                return [$message->sender_id, $message->receiver_id];
            })
            ->unique()
            ->filter(function ($id) use ($user) {
                return $id !== $user->id;
            });

        $users = User::whereIn('id', $messagedUserIds)->get();

        return response()->json($users);
    }
}
