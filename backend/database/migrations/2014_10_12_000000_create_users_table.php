<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('dog_images');
            $table->string('about_me')->nullable();
            $table->string('city')->nullable();
            $table->integer('age')->nullable();
            $table->string('race')->nullable();
            $table->string('color')->nullable();
            $table->string('human_name');
            $table->string('human_images');
            $table->string('about_my_human')->nullable();
            $table->integer('age_my_human')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
