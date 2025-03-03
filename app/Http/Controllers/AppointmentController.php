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
            'appointment_date' => 'required|date|after:now',
        ]);
    
        // Validación condicional para invitados
        $request->validate([
            'guest_name' => auth()->check() ? 'nullable' : 'required|string',
            'guest_number' => auth()->check() ? 'nullable' : 'required|string',
            'guest_email' => auth()->check() ? 'nullable|email' : 'required|email',
        ]);
    
        // Validación de horario disponible
        $appointmentDateTime = Carbon::parse($request->appointment_date);
        $existingAppointment = Appointment::where('appointment_date', $appointmentDateTime)->exists();
    
        if ($existingAppointment) {
            return redirect()->back()->withErrors([
                'appointment_date' => 'El horario seleccionado no está disponible.',
            ]);
        }
    
        // Crear el turno
        Appointment::create([
            'user_id' => auth()->id(),
            'appointment_date' => $appointmentDateTime,
        ] + (auth()->check() ? [] : [
            'guest_name' => $request->guest_name,
            'guest_number' => $request->guest_number,
            'guest_email' => $request->guest_email,
        ]));
    
        return redirect()->back()->with('success', 'Turno agendado correctamente.');
    }

    public function myAppointments(Request $request)
    {
        // Si el usuario está autenticado, muestra sus turnos
        if (auth()->check()) {
            $appointments = Appointment::where('user_id', auth()->id())
                ->orderBy('appointment_date', 'desc')
                ->get();
            return Inertia::render('Appointments/MyAppointments', [
                'appointments' => $appointments,
            ]);
        }

        // Si no está autenticado, muestra el formulario de búsqueda
        return Inertia::render('Appointments/MyAppointments');
    }

    public function searchAppointments(Request $request)
    {
        // Validar el input (email o número de teléfono)
        $request->validate([
            'search' => 'required|string',
        ]);


        // Buscar turnos por email o número de teléfono
        $appointments = Appointment::where('guest_email', $request->search)
            ->orWhere('guest_number', $request->search)
            ->orderBy('appointment_date', 'desc')
            ->paginate(10) // 10 citas por página
            ->get();

        return Inertia::render('Appointments/MyAppointments', [
            'appointments' => $appointments,
            'search' => $request->search, // Para mantener el valor en el input
        ]);
    }
}
