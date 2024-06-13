<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $notifications = Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->with('message.sender')
            ->get();

        return response()->json($notifications);
    }

    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->is_read = true;
        $notification->save();

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function deleteConversationNotifications($senderId)
    {
        $userId = Auth::id();
        Notification::whereHas('message', function($query) use ($userId, $senderId) {
            $query->where(function($query) use ($userId, $senderId) {
                $query->where('sender_id', $userId)
                      ->where('receiver_id', $senderId);
            })->orWhere(function($query) use ($userId, $senderId) {
                $query->where('sender_id', $senderId)
                      ->where('receiver_id', $userId);
            });
        })->delete();

        return response()->json(['message' => 'Notifications deleted']);
    }
}
