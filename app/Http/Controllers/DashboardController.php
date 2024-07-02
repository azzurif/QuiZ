<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'quizzes' => Quiz::where('user_id', auth()->user()->id)
                ->latest()
                ->with('user')
                ->get(),
        ]);
    }
}
