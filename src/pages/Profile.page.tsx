import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/user.context'

const ProfilePage: React.FC = () => {
    const userContext = useContext(UserContext)

    useEffect(() => {
        const token = localStorage.getItem('Auth')
        const id = localStorage.getItem('id')
        if (token && id) {
            if (userContext) {
                userContext.getUserProfile(token, id) // Asegúrate de que este método sea necesario
            }
        }
    }, [userContext])

    if (!userContext) {
        return <div className="text-red-500 font-bold">Error: Contexto no disponible</div>
    }

    const { user } = userContext

    if (!user) {
        return <div className="text-gray-500">No hay información del usuario disponible.</div>
    }

    return (
        <div className="min-h-screen py-10 mt-16">
            <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Perfil del Usuario</h1>
                <div className="space-y-4">
                    <p className="text-lg text-gray-600">
                        <strong className="font-medium text-gray-700">Nombre:</strong> {user.firstName}
                    </p>
                    <p className="text-lg text-gray-600">
                        <strong className="font-medium text-gray-700">Email:</strong> {user.email}
                    </p>
                    <p className="text-lg text-gray-600">
                        <strong className="font-medium text-gray-700">Rol:</strong> {user.role}
                    </p>
                    <p className="text-lg text-gray-600">
                        <strong className="font-medium text-gray-700">ID:</strong> {user.id}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
