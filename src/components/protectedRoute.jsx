import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-6 bg-white shadow-md rounded-md text-center">
          <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión</h2>
          <p className="mb-4">Por favor, inicia sesión para acceder a esta página.</p>
          <a href="/login" className="text-blue-500 hover:underline">Ir a la página de inicio de sesión</a>
          <Route 
          path="/login" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
