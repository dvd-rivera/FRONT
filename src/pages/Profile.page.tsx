import React, { useContext } from "react";
import { UserContext } from "../context/user.context";

const ProfilePage: React.FC = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div className="text-red-500 font-bold">Error: Contexto no disponible</div>;
  }

  const { user } = userContext;

  return (
    <div className="min-h-screen py-10 mt-16">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Perfil del Usuario</h1>
        {user ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              <strong className="font-medium text-gray-700">Nombre:</strong> {user.firstName}
            </p>
            <p className="text-lg text-gray-600">
              <strong className="font-medium text-gray-700">Email:</strong> {user.email}
            </p>
            <p className="text-lg text-gray-600">
              <strong className="font-medium text-gray-700">Teléfono:</strong> {user.phone || "No disponible"}
            </p>
            <p className="text-lg text-gray-600">
              <strong className="font-medium text-gray-700">Rol:</strong> {user.role}
            </p>
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Direcciones:</h2>
              {user.addresses && user.addresses.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2">
                  {user.addresses.map((address, index) => (
                    <li key={index} className="text-gray-600">
                      <span className="font-medium text-gray-700">{address.tipo}:</span> {address.direccion}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No hay direcciones disponibles.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No hay información del usuario disponible.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
