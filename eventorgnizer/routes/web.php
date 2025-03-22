<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/register', [AuthController::class, 'Registration'])->name('register');
// Route::post('/register', [AuthController::class, 'registerUser'])->name('register.post');

// Route::get('/login', function () {
//     return view('auth.login');
// })->name('login');
// // Route::post('/login', [AuthController::class, 'loginUser'])->name('login.post');

// // Route::post('/logout', [AuthController::class, 'logoutUser'])->name('logout');

// Route::middleware(['auth'])->group(function () {
//     // Route::middleware('guest')->get('/dashboard', function () {
//     //     return view('dashboard');
//     // })->name('dashboard');

//     // Route::get('/admin', function () {
//     //     return view('admin');
//     // })->name('admin')->middleware('role:1');

//     Route::get('/manager', function () {
//         return view('manager');
//     })->name('manager')->middleware('role:2');

//     Route::get('/user', function () {
//         return view('user');
//     })->name('user')->middleware('role:3');
// });
// Route::middleware('auth')->get('/logout', [AuthController::class, 'logoutUser'])->name('logout');
