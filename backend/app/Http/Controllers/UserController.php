<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try{
            $body = $request->except('role');
            $body['role'] = 'user';
            $body['password'] = Hash::make($body['password']);
            $user = User::create($body);
            return response($user, 201);
        }catch(\Exception $error){
            return response([
                'message' => 'Hubo un problema al intentar registrar al usuario',
                'error' => $error->getMessage()
            ], 500);
        }
    }
    public function login(Request $request)
    {
        try{
            $credentials = $request->only('email', 'password');
            if(!Auth::attempt($credentials)){
                return response([
                    'message' => 'Usuario o contraseña incorrectos'
                ], 400);
            }
            $user = Auth::user();
            $token = $user->createToken('authToken')->accessToken;
            $user->token = $token;
            return response([
                'user' => $user
            ]);
        }catch(\Exception $error){
            return response([
                'message' => 'Hubo un problema al intentar conectar al usuario',
                'error' => $error->getMessage()
            ], 500);
        }
    }
    public function logout()
    {
        try{
            Auth::user()->token()->delete();
            return response([
                'message' => 'Usuario desconectado correctamente'
            ]);
        } catch(\Exception $error){
            return response([
                'message' => 'Hubo un problema al intentar desconectar al usuario',
                'error' => $error->getMessage()
            ], 500);
        }   
    }
    public function getAll()
    {
        try {   
            $user_id = Auth::id();
            $users = User::where('id', '<>', $user_id)->get(); 
            return response($users);
        } catch (\Exception $error) {
            return response([
                'error' => $error
            ], 500);
        }
    }


    // public function addComment(Request $request,$id)
    // {
    //     try {
    //         $body = $request->validate([
    //             'body' => 'string'
    //         ]);
    //         $user = User::find($id); // usuario que lo recibe
    //         $body['user_id'] = Auth::id();//usuario que lo manda
    //         $comments =$user->comments()->where('user_id',$body['user_id'])->get();
    //         $comment = new Comment($body);
    //         $user->comments()->save($comment);
    //         return $user->load('comments.user');
    //     } catch (\Exception $error) {
    //         return response( $error, 500);
    //     }
    // }
}
