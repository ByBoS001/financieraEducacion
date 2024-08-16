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
        <div className="login-container">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}   
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                
                <div className="register-now">
                    <p>Dont have an account? <a href="/register" className="register-link">Register now</a></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
