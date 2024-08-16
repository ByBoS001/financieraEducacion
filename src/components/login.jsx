// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        try {
            const response = await fetch('http://localhost:3000/users/login', requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to login');
            // Guardar el token en localStorage
            localStorage.setItem('authToken', data.token);
            toast.success('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = '/modulos';
            }, 2000); // Delay to show the toast before redirecting
        } catch (error) {
            console.error('Login failed:', error.message);
            toast.error(`Login failed: ${error.message}`);
        }
    }

    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-primary to-primary-foreground">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg sm:p-8 animate-fade-in">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight animate-fade-in-up">Bienvenido de vuelta</h1>
            <p className="text-muted-foreground animate-fade-in-up">Inicia sesión en tu cuenta para continuar</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 animate-fade-in-up"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <a
                  className="text-sm font-medium text-primary hover:underline animate-fade-in-up"
                  href="#"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 animate-fade-in-up"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full animate-fade-in-up"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="text-center text-sm text-muted-foreground animate-fade-in-up">
            <p>
              ¿No tienes una cuenta?{' '}
              <a href="/register" className="text-primary hover:underline">
                Regístrate ahora
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Login;
