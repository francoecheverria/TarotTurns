import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage, Link } from '@inertiajs/react';
import Calendar from 'react-calendar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import 'react-calendar/dist/Calendar.css';

export default function AppointmentsIndex({ auth }) {
    const { flash = {}, errors = {} } = usePage().props; // Valores por defecto
    const [date, setDate] = useState(new Date());
    const [guestName, setGuestName] = useState('');
    const [guestNumber, setGuestNumber] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const availableTimes = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    useEffect(() => {
        if (flash.success) {
            // Mostrar un mensaje de éxito en la interfaz
            const successMessage = document.createElement('div');
            successMessage.className = 'bg-green-500 text-white p-4 mb-4 rounded-lg';
            successMessage.innerText = flash.success;
            document.body.prepend(successMessage);

            // Eliminar el mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
        if (flash.error) {
            // Mostrar un mensaje de error en la interfaz
            const errorMessage = document.createElement('div');
            errorMessage.className = 'bg-red-500 text-white p-4 mb-4 rounded-lg';
            errorMessage.innerText = flash.error;
            document.body.prepend(errorMessage);

            // Eliminar el mensaje después de 5 segundos
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTime) {
            alert('Por favor, selecciona un horario.');
            return;
        }

        const appointmentDateTime = new Date(date);
        const [hours, minutes] = selectedTime.split(':');
        appointmentDateTime.setHours(hours, minutes);

        const data = {
            appointment_date: appointmentDateTime.toISOString(),
        };

        if (!auth.user) {
            data.guest_name = guestName;
            data.guest_number = guestNumber;
            data.guest_email = guestEmail;
        }

        Inertia.post('/appointments', data, {
            onError: (errors) => {
                // Manejo de errores específicos
                if (errors.appointment_date) {
                    alert(errors.appointment_date);
                }
                if (errors.guest_name) {
                    alert(errors.guest_name);
                }
                if (errors.guest_number) {
                    alert(errors.guest_number);
                }
                if (errors.guest_email) {
                    alert(errors.guest_email);
                }
            },
            onSuccess: () => {
                // Limpiar el formulario después de un éxito
                setGuestName('');
                setGuestNumber('');
                setGuestEmail('');
                setSelectedTime('');

                // Redirigir a "Mis Turnos" después de 2 segundos
                setTimeout(() => {
                    Inertia.visit('/mis-turnos');
                }, 2000);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-custom-purple text-white p-6">
                <Head title="Agendar Turno" />
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8 text-custom-pink">
                        Agendar Turno
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="bg-custom-dark-purple p-6 rounded-lg shadow-lg">
                            <Calendar
                                onChange={setDate}
                                value={date}
                                minDate={new Date()}
                                className="bg-custom-light-purple text-stone-600 rounded-lg p-4 shadow-inner"
                                tileClassName="text-stone-600 hover:bg-custom-pink rounded-full"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="bg-custom-dark-purple p-6 rounded-lg shadow-lg flex-1">
                            {!auth.user && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-custom-light-purple text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                                        required
                                    />
                                    {errors.guest_name && (
                                        <p className="text-red-500 text-sm mt-2">{errors.guest_name}</p>
                                    )}
                                    <input
                                        type="text"
                                        placeholder="Número de contacto"
                                        value={guestNumber}
                                        onChange={(e) => setGuestNumber(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-custom-light-purple text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                                        required
                                    />
                                    {errors.guest_number && (
                                        <p className="text-red-500 text-sm mt-2">{errors.guest_number}</p>
                                    )}
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={guestEmail}
                                        onChange={(e) => setGuestEmail(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-custom-light-purple text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                                        required
                                    />
                                    {errors.guest_email && (
                                        <p className="text-red-500 text-sm mt-2">{errors.guest_email}</p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-4 mt-4">
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-custom-light-purple text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                                    required
                                >
                                    <option value="" disabled>Selecciona un horario</option>
                                    {availableTimes.map((time, index) => (
                                        <option key={index} value={time}>{time}</option>
                                    ))}
                                </select>
                                {errors.appointment_date && (
                                    <p className="text-red-500 text-sm mt-2">{errors.appointment_date}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 bg-custom-pink text-custom-purple py-3 rounded-lg font-semibold hover:bg-custom-dark-pink transition-colors duration-300"
                            >
                                Agendar
                            </button>

                            {flash.success && (
                                <div className="mt-4 bg-green-500 text-white p-4 rounded-lg">
                                    {flash.success} <Link href="/mis-turnos" className="underline">Ver mis turnos</Link>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}