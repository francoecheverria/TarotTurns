import React, { useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function MyAppointments({ auth }) {
    const { appointments = [], search = '' } = usePage().props;
    const [searchQuery, setSearchQuery] = useState(search); // Estado para manejar la búsqueda

    const now = new Date();
    const pastAppointments = appointments.filter((appointment) => new Date(appointment.appointment_date) < now);
    const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.appointment_date) >= now);

    // Determina si se debe mostrar el cuadro de turnos
    const showAppointments = searchQuery.trim() !== ''; // Solo mostrar si hay una búsqueda

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-custom-purple text-white p-6">
                <Head title="Mis Turnos" />
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8 text-custom-pink">
                        Mis Turnos
                    </h1>

                    {!auth.user && (
                        <div className="bg-custom-dark-purple p-6 rounded-lg shadow-lg mb-8">
                            <form method="GET" action="/mis-turnos/buscar">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Ingresa tu email o número de teléfono"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-custom-light-purple text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-custom-pink text-custom-purple py-3 rounded-lg font-semibold hover:bg-custom-dark-pink transition-colors duration-300"
                                >
                                    Buscar
                                </button>
                            </form>
                        </div>
                    )}

                    {showAppointments && ( // Solo mostrar si hay una búsqueda
                        <div className="bg-custom-dark-purple p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Próximos Turnos</h2>
                            {upcomingAppointments.length > 0 ? (
                                <ul className="space-y-4">
                                    {upcomingAppointments.map((appointment) => (
                                        <li key={appointment.id} className="bg-custom-light-purple p-4 rounded-lg">
                                            <p className="text-lg font-semibold">
                                                Fecha: {new Date(appointment.appointment_date).toLocaleString()}
                                            </p>
                                            <p>Nombre: {appointment.guest_name || (auth.user ? auth.user.name : '')}</p>
                                            <p>Número: {appointment.guest_number || (auth.user ? auth.user.number : '')}</p>
                                            <p>Email: {appointment.guest_email || (auth.user ? auth.user.email : '')}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-400">No tienes turnos futuros.</p>
                            )}

                            <h2 className="text-2xl font-bold mt-8 mb-4">Turnos Pasados</h2>
                            {pastAppointments.length > 0 ? (
                                <ul className="space-y-4">
                                    {pastAppointments.map((appointment) => (
                                        <li key={appointment.id} className="bg-custom-light-purple p-4 rounded-lg">
                                            <p className="text-lg font-semibold">
                                                Fecha: {new Date(appointment.appointment_date).toLocaleString()}
                                            </p>
                                            <p>Nombre: {appointment.guest_name || (auth.user ? auth.user.name : '')}</p>
                                            <p>Número: {appointment.guest_number || (auth.user ? auth.user.number : '')}</p>
                                            <p>Email: {appointment.guest_email || (auth.user ? auth.user.email : '')}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-400">No tienes turnos pasados.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}