<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // Para usuarios logueados
            $table->string('guest_name')->nullable(); // Para invitados
            $table->string('guest_number')->nullable(); // Para invitados
            $table->string('guest_email')->nullable(); // Para invitados
            $table->dateTime('appointment_date'); // Fecha y hora del turno
            $table->timestamps();
        
            // Restricción de unicidad para evitar turnos duplicados
            $table->unique(['appointment_date']);
        
            // Clave foránea para usuarios
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
