<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Attempt;
use App\Models\Quiz;
use Inertia\Inertia;

class AttemptController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'quiz_id' => ['required', 'exists:quizzes,id'],
            'score' => ['required', 'integer'],
        ]);

        Attempt::updateOrCreate(
            [
                'user_id' => $validated['user_id'],
                'quiz_id' => $validated['quiz_id'],
            ],
            [
                'score' => $validated['score'],
            ]
        );

        $quiz = Quiz::find($validated['quiz_id']);

        return to_route('attempt.result', [
            'quiz' => $quiz->slug,
            'user' => $validated['user_id']
        ]);
    }

    public function result(Quiz $quiz, User $user)
    {
        $attempt = Attempt::where('quiz_id', $quiz->id)->where('user_id', $user->id)->firstOrFail();

        return Inertia::render('Attempt/Result', [
            'attempt' => $attempt,
        ]);
    }
}
