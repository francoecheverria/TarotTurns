import { Link } from '@inertiajs/react';

export default function Welcome({ }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-purple">
      <div className="text-center p-12 bg-custom-dark-purple shadow-xl rounded-lg w-96">
        <h1 className="text-4xl font-extrabold text-white mb-8">
          Bienvenido al Turnero
        </h1>

        <p className="text-lg text-custom-pink mb-6">
          Administra tus citas de manera fácil y eficiente. Regístrate o accede como invitado para comenzar.
        </p>

        <div className="mb-8">

          <div className="mt-4">

            <Link 
              href="/login"
              className="inline-block px-6 py-3 bg-custom-light-purple text-white rounded-lg text-xl hover:bg-custom-dark-purple transition-all duration-200"
            >
              Iniciar sesión
            </Link>
          </div>
          <div className="mt-4">

            <Link
              href="/register"
              className="inline-block px-6 py-3 bg-custom-light-purple text-white rounded-lg text-xl hover:bg-custom-dark-purple transition-all duration-200"
            >
              Registrarse
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href="/appointments"
            className="inline-block px-6 py-3 bg-custom-pink text-custom-purple rounded-lg text-xl hover:bg-custom-dark-pink transition-all duration-200"
          >
            Acceder como invitado
          </Link>
        </div>
      </div>
    </div>
  );
}