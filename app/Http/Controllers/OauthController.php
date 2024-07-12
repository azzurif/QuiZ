<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OauthController extends Controller
{
    public function redirect(string $driver)
    {
        return Socialite::driver($driver)->redirect();
    }

    public function callback(string $driver)
    {
        $user = Socialite::driver($driver)->user();

        $incoming_user = User::updateOrCreate([
            'email' => $user->getEmail(),
        ], [
            'provider_name' => $driver,
            'name' => $user->getName(),
        ]);

        $incoming_user->assignRole('standard');

        Auth::login($incoming_user);

        return to_route('dashboard');
    }
}
