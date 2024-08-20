import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icono de perfil
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // Verificar si hay un token en localStorage al cargar la página
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        try {
            const response = await fetch('https://educacionfinanciera-ipr0.onrender.com/users/login', requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to login');
            localStorage.setItem('authToken', data.token);
            setIsAuthenticated(true);
            toast.success('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = '/modulos';
            }, 2000);
        } catch (error) {
            console.error('Login failed:', error.message);
            toast.error(`Login failed: ${error.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        toast.info('Logged out successfully.');
    };

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

                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 text-sm font-medium text-primary-foreground animate-fade-in-up"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <FaUserCircle size={24} />
                                <span>Mi perfil</span>
                            </button>
                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <a
                                        href="/perfil"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Ver perfil
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
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
                    )}

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
