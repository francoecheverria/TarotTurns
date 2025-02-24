import React, { useState, useEffect  } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import Calendar from 'react-calendar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import 'react-calendar/dist/Calendar.css';

export default function AppointmentsIndex({ auth }) {
    const [date, setDate] = useState(new Date());
    const [guestName, setGuestName] = useState(auth.user ? auth.user.name : '');
    const [guestNumber, setGuestNumber] = useState(auth.user ? auth.user.number : '');
    const [guestEmail, setGuestEmail] = useState(auth.user ? auth.user.email : '');
    const [selectedTime, setSelectedTime] = useState('');

    // Definir los horarios disponibles
    const availableTimes = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    useEffect(() => {
        if (auth.user) {
            setGuestName(auth.user.name);
            setGuestNumber(auth.user.number);
            setGuestEmail(auth.user.email);
        }
    }, [auth.user]);


    const handleSubmit = (e) => {
        e.preventDefault();

        // Combinar fecha y hora seleccionada
        const appointmentDateTime = new Date(date);
        const [hours, minutes] = selectedTime.split(':');
        appointmentDateTime.setHours(hours, minutes);

        const data = {
            appointment_date: appointmentDateTime.toISOString(),
        };


        if (!auth.user) {
            // Si es invitado, enviar los datos ingresados manualmente
            data.guest_name = guestName;
            data.guest_number = guestNumber;
            data.guest_email = guestEmail;
        } else {
            // Si está registrado, enviar los datos del usuario
            data.guest_name = auth.user.name;
            data.guest_number = auth.user.number;
            data.guest_email = auth.user.email;
        }

        Inertia.post('/appointments', data);
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
                        <div className="bg-custom-dark-purple p-6 rounded-lg shadow-lg ">
                            <Calendar
                                onChange={setDate}
                                value={date}
                                minDate={new Date()}
                                className="bg-custom-light-purple text-stone-600 rounded-lg p-4 shadow-inner"
                                tileClassName="text-stone-600 hover:bg-custom-pink rounded-full"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="bg-custom-dark-purple p-6 rounded-lg shadow-lg flex-1">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-custom-light-purple text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Número de contacto"
                                        value={guestNumber}
                                        onChange={(e) => setGuestNumber(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-custom-light-purple text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={guestEmail}
                                        onChange={(e) => setGuestEmail(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-custom-light-purple text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                                        required
                                    />
                                </div>
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
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 bg-custom-pink text-custom-purple py-3 rounded-lg font-semibold hover:bg-custom-dark-pink transition-colors duration-300"
                            >
                                Agendar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}