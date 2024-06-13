<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Register a new user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'address' => 'nullable|string|max:255',
            'birthdate' => 'required|date',
            'gender' => 'required|string|in:male,female,other',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'address' => $request->address,
            'birthdate' => $request->birthdate,
            'gender' => $request->gender,
        ]);

        // Return a success response
        return response()->json(['user' => $user], 201);
    }

    /**
     * Search for users based on a query.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $searchQuery = $request->input('search');
        $users = User::where('first_name', 'LIKE', "%{$searchQuery}%")
            ->orWhere('last_name', 'LIKE', "%{$searchQuery}%")
            ->orWhere('email', 'LIKE', "%{$searchQuery}%")
            ->get();

        return response()->json($users);
    }

    /**
     * Update the specified user in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Ensure the authenticated user is updating their own information
        if ($user->id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'birthdate' => 'sometimes|date',
            'gender' => 'sometimes|string|in:male,female,other',
        ]);

        $user->update($data);

        return response()->json($user);
    }

    
}
