<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::all();
        return Inertia::render('Appointments/Index', ['appointments' => $appointments]);
    }

    public function store(Request $request)
    {
        // Validación básica
        $request->validate([
            'appointment_date' => 'required|date|after:now|unique:appointments,appointment_date',
            'guest_name' => auth()->check() ? 'nullable' : 'required|string',
            'guest_number' => auth()->check() ? 'nullable' : 'required|string',
            'guest_email' => auth()->check() ? 'nullable|email' : 'required|email',
        ]);

        // Crear el turno
        Appointment::create([
            'user_id' => auth()->check() ? auth()->id() : null,
            'guest_name' => auth()->check() ? null : $request->guest_name,
            'guest_number' => auth()->check() ? null : $request->guest_number,
            'guest_email' => auth()->check() ? null : $request->guest_email,
            'appointment_date' => $request->appointment_date,
        ]);

        return redirect()->back()->with('success', 'Turno agendado correctamente.');
    }
}