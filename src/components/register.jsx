// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../registerStyle.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        };

        try {
            const response = await fetch('http://localhost:3000/users/register', requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Something went wrong');
            toast.success('¡Registro exitoso!');
            setName('');
            setEmail('');
            setPassword('');
            window.location.href = '/login';
        } catch (error) {
            toast.error(`Error al registrar: ${error.message}`);
        }
    }

    return (
        <div className="register-container">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <form onSubmit={handleSubmit}>
                <h2>Registro</h2>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
