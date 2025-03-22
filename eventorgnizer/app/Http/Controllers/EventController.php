<?php
namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Category;
use App\Models\EventUser;
use App\Models\User;
use Illuminate\Support\Facades\DB;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();
        return response()->json($events);
    }

    public function showUserEvents(Request $request)
    {
        $userId = $request->header('User-ID');

        $userEvents = Event::where('created_by', $userId)->get();

        return response()->json($userEvents);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'event_date' => 'required|date',
            'created_by' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);

        // if ($event->created_by != Auth::id()) {
        //     return response()->json(['message' => 'You are not authorized to delete this event.'], 403);
        // }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }


    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    // ------------------------------------------------------------
    public function addInterest(Request $request, $eventId)
    {
        $userId = $request->user_id;

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $existingInterest = EventUser::where('user_id', $userId)->where('event_id', $eventId)->first();
        if ($existingInterest) {
            return response()->json(['message' => 'You have already shown interest in this event'], 400);
        }

        EventUser::create([
            'user_id' => $userId,
            'event_id' => $eventId,
        ]);

        return response()->json(['message' => 'Interest added successfully'], 200);
    }

    // public function showUserInterests(Request $request)
    // {
    //     $userId = $request->user()->id;

    //     $events = User::find($userId)->events;

    //     return response()->json($events);
    // }


    public function getInterestedEvents(Request $request)
    {
        $userId = $request->user_id;

        $eventIds = DB::table('event_user')
                      ->where('user_id', $userId)
                      ->pluck('event_id');

        $events = Event::whereIn('id', $eventIds)->get();

        return response()->json($events);
    }



public function removeInterest($eventId, Request $request)
{
    $userId = $request->user()->id;

    $event = Event::find($eventId);
    if (!$event) {
        return response()->json(['message' => 'Event not found'], 404);
    }

    $event->users()->detach($userId);

    return response()->json(['message' => 'Interest removed successfully']);
}


}
