<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta de bienvenida
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Ruta del dashboard (solo para usuarios autenticados)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas de perfil (solo para usuarios autenticados)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Ruta para mostrar el calendario de citas (disponible para todos)
Route::get('/appointments', function () {
    return Inertia::render('Appointments/Index');
})->name('appointments.index');

// Ruta para manejar el envío del formulario de citas
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

// Ruta para mostrar "Mis Turnos"
Route::get('/mis-turnos', [AppointmentController::class, 'myAppointments'])->name('appointments.my');

// Ruta para buscar turnos de invitados
Route::post('/mis-turnos/buscar', [AppointmentController::class, 'searchAppointments'])->name('appointments.search');

// Rutas de autenticación
require __DIR__.'/auth.php';