<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Quiz;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('update_quiz', function (User $user, Quiz $quiz) {
            return $user->id === $quiz->user_id
                ? Response::allow()
                : Response::deny("You Ain't the quiz owner");
        });
    }
}
