<?php

// namespace App\Http\Controllers;

// use App\Models\Message;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use App\Models\User;
// use App\Models\Notification;

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

//         // Create a notification for the receiver
//         Notification::create([
//         'user_id' => $request->receiver_id,
//         'message_id' => $message->id,
//     ]);

//         return response()->json($message, 201);
//     }

//     public function getMessagedUsers()
//     {
//         $user = Auth::user();
        
//         // Get the list of user IDs with whom the authenticated user has had conversations
//         $messagedUserIds = Message::where('sender_id', $user->id)
//             ->orWhere('receiver_id', $user->id)
//             ->select('sender_id', 'receiver_id')
//             ->get()
//             ->flatMap(function ($message) use ($user) {
//                 return [$message->sender_id, $message->receiver_id];
//             })
//             ->unique()
//             ->filter(function ($id) use ($user) {
//                 return $id !== $user->id;
//             });

//         $users = User::whereIn('id', $messagedUserIds)->get();

//         return response()->json($users);
//     }
// }



namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        // Create a notification for the receiver
        Notification::create([
            'user_id' => $request->receiver_id,
            'message_id' => $message->id,
        ]);

        return response()->json($message, 201);
    }

    public function getMessagedUsers()
    {
        $userId = Auth::id();
        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender', 'receiver'])
            ->get();

        $users = $messages->map(function ($message) use ($userId) {
            $otherUserId = $message->sender_id === $userId ? $message->receiver_id : $message->sender_id;
            $otherUser = User::find($otherUserId);
            $unreadMessages = Message::where('sender_id', $otherUserId)
                ->where('receiver_id', $userId)
                ->where('read', false)
                ->exists();
            $otherUser->has_unread_messages = $unreadMessages;
            return $otherUser;
        })->unique('id')->values();

        return response()->json($users);
    }


    public function markAsRead($userId)
    {
        $authUserId = Auth::id();
        Message::where('sender_id', $userId)
            ->where('receiver_id', $authUserId)
            ->update(['read' => true]);

        return response()->json(['message' => 'Message marked as read']);
    }


    public function markAsUnread($userId)
    {
        $currentUserId = Auth::id();
        Message::where('sender_id', $userId)
            ->where('receiver_id', $currentUserId)
            ->update(['read' => false]);

        return response()->json(['message' => 'Messages marked as unread']);
    }
}
