<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Quiz;
use \Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Quiz/Index', [
            'quizzes' => Quiz::with('user')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Quiz $quiz)
    {
        return Inertia::render('Quiz/Create', [
            'quiz' => $quiz
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required'],
            'title' => ['required', 'max:255'],
            'slug' => ['unique:quizzes'],
            'questions' => ['required', 'array'],
            'questions.*.content' => ['required', 'max:255'],
            'questions.*.answers' => ['required', 'array'],
            'questions.*.answers.*.content' => ['required'],
            'questions.*.answers.*.is_correct' => ['required', 'boolean']
        ]);

        $quiz = Quiz::create($validated);

        foreach ($validated['questions'] as $questionData) {
            $question = $quiz->questions()->create($questionData);

            foreach ($questionData['answers'] as $answerData) {
                $question->answers()->create($answerData);
            }
        }

        return to_route('quiz.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        return Inertia::render('Quiz/Show', [
            'quiz' => $quiz->load('questions.answers'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        Gate::authorize('update_quiz', $quiz);

        return Inertia::render('Quiz/Edit', [
            'quiz' => $quiz->load('questions.answers'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        Gate::authorize('update_quiz', $quiz);

        $validated = $request->validate([
            'title' => ['required', 'max:255'],
            'questions' => ['required', 'array'],
            'questions.*.content' => ['required', 'max:255'],
            'questions.*.answers' => ['required', 'array'],
            'questions.*.answers.*.content' => ['required', 'max:255'],
            'questions.*.answers.*.is_correct' => ['required', 'boolean'],
        ]);

        $quiz->update([
            'title' => $validated['title'],
        ]);

        $questionIds = [];
        $answerIds = [];

        foreach ($validated['questions'] as $questionData) {
            $question = $quiz->questions()->updateOrCreate(
                ['id' => $questionData['id'] ?? null],
                ['content' => $questionData['content']]
            );
            $questionIds[] = $question->id;

            foreach ($questionData['answers'] as $answerData) {
                $answer = $question->answers()->updateOrCreate(
                    ['id' => $answerData['id'] ?? null],
                    [
                        'content' => $answerData['content'],
                        'is_correct' => $answerData['is_correct'],
                    ]
                );
                $answerIds[] = $answer->id;
            }
        }

        $quiz->questions()->whereNotIn('id', $questionIds)->delete();

        Answer::whereNotIn('id', $answerIds)->whereIn('question_id', $questionIds)->delete();

        return to_route('quiz.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return redirect()->back();
    }
}
