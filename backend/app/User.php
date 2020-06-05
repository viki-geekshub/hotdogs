<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'dog_images', 'about_me', 'city', 'age', 'race', 'color', 'human_name', 'human_images', 'about_my_human', 'age_my_human'
    ];
    public function users()
    {
        return $this->manyToMany('\App\User');
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function followers()
    {
        return $this->belongsToMany(
            self::class,
            'matchs',
            'followed_id',
            'follower_id',
        );
    }
    public function followings()
    {
        return $this->belongsToMany(
            self::class,
            'matchs',
            'follower_id',
            'followed_id',
        );
    }
    // public function received()
    // {
    //     return $this->belongsToMany(
    //         self::class,
    //         'messages',
    //         'follower_id',
    //         'followed_id',
    //     );
    // }
    // public function sent()
    // {
    //     return $this->belongsToMany(
    //         self::class,
    //         'messages',
    //         'followed_id',
    //         'follower_id',
    //     );
    // }

}
