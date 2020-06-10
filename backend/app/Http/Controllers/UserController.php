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
                'message' => 'Usuario conectado con éxito',
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
    public function update(Request $request) // Para modificar el perfil del usuario
    {
        try {
            $body = $request->validate([
                'name' => 'string',
                'email' => 'string',
                'password' => 'string'
            ]);
            $id = Auth::id();
            $user = User::find($id);
            if ($request->has('password')){
                $body['password']=Hash::make($body['password']);
            }
            $user->update($body);
            return response($user);
        } catch (\Exception $e) {
            return response([
                'message' => 'Hubo un error al intentar actualizar el perfil',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getAll()  // Nos muestra todos los usuarios con los que no has interactuado aún (No aparecen los que ya has dado like, ni los que has dado nope, pero si aparecen los que te han dado nope a ti)
    {
        try {    
            $user_id = Auth::id();
            $interacted_ids = DB::table('matchs')->where('follower_id', $user_id)->where(function($query){
                $query->where('like',1)->orWhere('nope',1);
            })->get()->pluck('followed_id'); //pluck: para sacar un array de objetos
           

            $users = User::whereNotIn('id', $interacted_ids->push($user_id))->get();
            return response($users);
        } catch (\Exception $error) {
            return response([
                'error' => $error
            ], 500);
        }
    }
    public function infoUser(){
        return Auth::user();
    }
    public function like($followedId)
    {
       $followerId=Auth::id();
    //    $user = User::find($followedId)->following()->attach([$followedId=>['like'=>true]]);
    $mutualFollowers =DB::table('matchs')->where('follower_id',$followedId)->where('followed_id',$followerId)->where('like',true);    
    $isMatch=$mutualFollowers->get()->isNotEmpty();
        DB::table('matchs')->insert([
            'follower_id'=>$followerId,
            'followed_id'=>$followedId,
            'like'=>true,
            'match'=>$isMatch,
            'nope'=>false,
            ]);
            if($isMatch){
                $user = User::find($followedId);
                $mutualFollowers->update(['match'=>true]);
                  return response(['message'=>'has hecho match','user'=>$user],201);
                }
            return response(['message'=>'Te mola']);
    }
    public function nope($followedId)
    {
       $followerId=Auth::id();
        DB::table('matchs')->insert([
            'follower_id'=>$followerId,
            'followed_id'=>$followedId,
            'like'=>false,
            'match'=>false,
            'nope'=>true,
            ]);
            return response(['message'=>'No te mola']);
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
