<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attempt;
use App\Models\Quiz;

class AttemptController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'quiz_id' => ['required', 'exists:quizzes,id'],
            'score' => ['required', 'integer'],
        ]);

        Attempt::create($validated);

        return redirect()->back();
    }
}
