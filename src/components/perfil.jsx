import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css"; // Asegúrate de que esta ruta sea correcta

const getToken = () => {
  return localStorage.getItem("authToken");
};

const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/users/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [completedDates, setCompletedDates] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      const token = getToken();
      if (token) {
        try {
          const userId = JSON.parse(atob(token.split(".")[1]))._id;
          const profileData = await fetchUserProfile(userId);
          setUser(profileData);
          // Calculate completed dates based on profile data
          const dates = profileData.completedModules.map(
            (module) => new Date(module.completedDate)
          ); // Assuming `completedDate` exists
          setCompletedDates(dates);
        } catch (err) {
          setError(err.message);
        }
      } else {
        setError("No token found");
      }
      setLoading(false);
    };

    getUserProfile();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      // Check if the date is one of the completed dates
      const isCompleted = completedDates.some(
        (d) => d.toDateString() === date.toDateString()
      );
      return isCompleted ? "bg-green-200 streak-day" : null;
    }
  };

  const tileContent = ({ date }) => {
    const count = completedDates.filter(
      (d) => d.toDateString() === date.toDateString()
    ).length;

    return count > 0 ? (
      <div className="streak-day-count" title={`${count} streak day${count > 1 ? 's' : ''}`}>
        {count}
      </div>
    ) : null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>

        <div className="relative flex flex-col items-center overflow-hidden rounded-lg bg-white shadow-lg p-6 w-full max-w-md">
          <div className="text-center mb-4">
            <div className="text-xl font-semibold">{user.name}</div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 w-full">
            <p className="text-xl font-semibold">
              Email: <span className="font-normal">{user.email}</span>
            </p>
            <p className="text-xl font-semibold">
              Fecha de Creación:{" "}
              <span className="font-normal">
                {new Date(user.creation_date).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Completed Modules</h2>
        <ul className="list-disc pl-5">
          {user.completedModules.length > 0 ? (
            user.completedModules.map((module) => (
              <li key={module._id} className="text-lg mb-1">
                {module.name}
              </li>
            ))
          ) : (
            <li className="text-lg mb-1 text-gray-500">No completed modules</li>
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Streak Calendar</h2>
        <div className="mt-4">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            tileContent={tileContent}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
