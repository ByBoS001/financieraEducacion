import React, { useEffect, useState } from 'react';

const getToken = () => {
    return localStorage.getItem('authToken');
};

const fetchUserProfile = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/users/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            setLoading(true);
            const token = getToken();
            if (token) {
                try {
                    const userId = JSON.parse(atob(token.split('.')[1]))._id; // Decodifica el ID del usuario del token
                    const profileData = await fetchUserProfile(userId);
                    setUser(profileData);
                } catch (err) {
                    setError(err.message);
                }
            } else {
                setError('No token found');
            }
            setLoading(false);
        };

        getUserProfile();
    }, []);

    const calculateStreakDays = () => {
        if (!user || !user.lastLoginDate) return 0;

        const lastLogin = new Date(user.lastLoginDate);
        const today = new Date();
        const timeDiff = today - lastLogin;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return Math.max(0, daysDiff);
    };

    const streakDays = calculateStreakDays();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    // Asegúrate de que completedModules sea un array
    const completedModules = Array.isArray(user.completedModules) ? user.completedModules : [];

    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Creation Date: {new Date(user.creation_date).toLocaleDateString()}</p>

            <h2>Completed Modules</h2>
            <ul>
                {completedModules.map(module => (
                    <li key={module._id}>{module.name}</li>
                ))}
            </ul>

            <h2>Streak Calendar</h2>
            <p>Days Streak: {streakDays}</p>
        </div>
    );
};

export default UserProfile;
