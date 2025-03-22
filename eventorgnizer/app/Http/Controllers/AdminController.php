<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Category;
use App\Models\Event;
use App\Models\EventUser;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Get all roles
    public function getRoles()
    {
        return response()->json(Role::all());
    }

    // Create a role
    public function createRole(Request $request)
    {
        $role = Role::create($request->all());
        return response()->json($role, 201);
    }

    // Update a role
    public function updateRole(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->update($request->all());
        return response()->json($role);
    }

    // Delete a role
    public function deleteRole($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully']);
    }

    // CRUD for Users

    // Get all users
    public function getUsers()
    {
        return response()->json(User::with('role')->get());
    }

    // Create a user
    public function createUser(Request $request)
    {
        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    // Update a user
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }

    // Delete a user
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    // CRUD for Categories

    // Get all categories
    public function getCategories()
    {
        return response()->json(Category::all());
    }

    // Create a category
    public function createCategory(Request $request)
    {
        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    // Update a category
    public function updateCategory(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json($category);
    }

    // Delete a category
    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }

    // CRUD for Events

    // Get all events
public function getEvents()
{
    return response()->json(Event::all());
}

    // Create an event
    public function createEvent(Request $request)
    {
        $event = Event::create($request->all());
        return response()->json($event, 201);
    }

    // Update an event
    public function updateEvent(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        return response()->json($event);
    }

    // Delete an event
    public function deleteEvent($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }

    // CRUD for Event_User

    // Get all event users
    public function getEventUsers()
    {
        return response()->json(EventUser::with(['event', 'user'])->get());
    }

    // Create an event user
    public function createEventUser(Request $request)
    {
        $eventUser = EventUser::create($request->all());
        return response()->json($eventUser, 201);
    }

    // Delete an event user
    public function deleteEventUser($id)
    {
        $eventUser = EventUser::findOrFail($id);
        $eventUser->delete();
        return response()->json(['message' => 'Event User deleted successfully']);
    }
}
