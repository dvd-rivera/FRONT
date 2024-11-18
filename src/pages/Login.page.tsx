import React, { useContext, useState } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
    const user = useContext(UserContext)
    const login = user?.login
    const navigate = useNavigate()

    // Estados para almacenar el correo y la contraseña
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Manejar el envío del formulario
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        if (login) {
            // Llamar a la función `login` con los datos del formulario
            login({ email, password })
        } else {
            console.error('Login function is not defined in UserContext.')
        }
    }

    return (
        <section className="flex items-center justify-center login-section">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Iniciar sesión
                </h2>
                <form onSubmit={handleLogin}>
                    {/* Campo de correo */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Ingresa tu correo"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {/* Campo de contraseña */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Ingresa tu contraseña"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {/* Botón para iniciar sesión */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
                {/* Botón para navegar a /register */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?
                        <button
                            onClick={() => navigate('/register')}
                            className="text-blue-500 hover:underline ml-1"
                        >
                            Regístrate aquí
                        </button>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
