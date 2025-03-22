<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Laravel\Sanctum\Sanctum;

Route::post('/register', [AuthController::class, 'registerUser'])->name('register.post');

Route::post('/login', [AuthController::class, 'loginUser'])->name('login.post');

Route::post('/logout', [AuthController::class, 'logoutUser'])->middleware('auth:sanctum')->name('logout');

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', [AuthController::class, 'getUser'])->name('user'); // Only one definition

    Route::middleware('role:1')->get('/admin', function () {
        return response()->json(['message' => 'Admin Dashboard']);
    })->name('admin');

    Route::middleware('role:2')->get('/manager', function () {
        return response()->json(['message' => 'Manager Dashboard']);
    })->name('manager');

    Route::middleware('role:3')->get('/user-dashboard', function () {
        return response()->json(['message' => 'User Dashboard']);
    })->name('user');
});

Route::get('/api/test', function () {
    return response()->json(['message' => 'API is working!']);
});

use App\Http\Controllers\EventController;

    Route::get('events', [EventController::class, 'index']);
    Route::get('user/events', [EventController::class, 'showUserEvents']);
    Route::post('events', [EventController::class, 'store']);
    Route::put('events/{id}', [EventController::class, 'update']);
    Route::delete('events/{id}', [EventController::class, 'destroy']);
    Route::get('categories', [EventController::class, 'getCategories']);


    Route::get('user/events/interest', [EventController::class, 'showUserInterests']);
    Route::post('events/{eventId}/interest', [EventController::class, 'addInterest']);
    Route::post('events/{eventId}/uninterest', [EventController::class, 'removeInterest']);


    Route::put('/events/{id}', [EventController::class, 'update']);

    Route::get('user/{userId}/interested-events', [EventController::class, 'getInterestedEvents']);


    use App\Http\Controllers\AdminController;

Route::prefix('admin')->group(function () {

    // Routes for Roles
    Route::get('roles', [AdminController::class, 'getRoles']);
    Route::post('roles', [AdminController::class, 'createRole']);
    Route::put('roles/{id}', [AdminController::class, 'updateRole']);
    Route::delete('roles/{id}', [AdminController::class, 'deleteRole']);

    // Routes for Users
    Route::get('users', [AdminController::class, 'getUsers']);
    Route::post('users', [AdminController::class, 'createUser']);
    Route::put('users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('users/{id}', [AdminController::class, 'deleteUser']);

    // Routes for Categories
    Route::get('categories', [AdminController::class, 'getCategories']);
    Route::post('categories', [AdminController::class, 'createCategory']);
    Route::put('categories/{id}', [AdminController::class, 'updateCategory']);
    Route::delete('categories/{id}', [AdminController::class, 'deleteCategory']);

    // Routes for Events
    Route::get('events', [AdminController::class, 'getEvents']);
    Route::post('events', [AdminController::class, 'createEvent']);
    Route::put('events/{id}', [AdminController::class, 'updateEvent']);
    Route::delete('events/{id}', [AdminController::class, 'deleteEvent']);

    // Routes for Event_User
    Route::get('event-users', [AdminController::class, 'getEventUsers']);
    Route::post('event-users', [AdminController::class, 'createEventUser']);
    Route::delete('event-users/{id}', [AdminController::class, 'deleteEventUser']);

    Route::put('admin/users/{id}', [AdminController::class, 'update']);

});
