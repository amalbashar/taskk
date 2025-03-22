<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->timestamps();
        });
        DB::table('categories')->insert([
            ['name' => 'Conference'],
            ['name' => 'Workshop'],
            ['name' => 'Seminar'],
            ['name' => 'Meetup'],
            ['name' => 'Networking Event'],
            ['name' => 'Webinar'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
