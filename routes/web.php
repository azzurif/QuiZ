<?php

use App\Http\Controllers\AttemptController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/profile/admined', [ProfileController::class, 'admined'])->name('profile.admined')->middleware('role:standard');

    Route::get('/users', [UserController::class, 'index'])->name('users.index')->middleware('permission:read users');

    Route::resource('/quiz', QuizController::class);
    Route::post('/attempt/quiz', [AttemptController::class, 'store'])->name('attempt.store');
    Route::get('/attempt/{quiz:slug}/{user}', [AttemptController::class, 'result'])->name('attempt.result');

    Route::middleware(['permission:edit users|create users|delete users'])->group(function () {
        Route::resource('/users', UserController::class)->except(['index']);
    });
});


require __DIR__ . '/auth.php';
