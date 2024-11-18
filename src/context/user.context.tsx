// UserContext.js
import React, { createContext, useState } from 'react'
import { dbAddress, User, UserLoginData, UserRegisterData } from '../models/user.interface'
import { useNavigate } from 'react-router-dom'

interface UserContextType {
    user: User | null
    isAuthenticated: boolean
    login: (userLoginData: UserLoginData) => void
    logout: () => void
    register: (userRegisterData: UserRegisterData) => void
    isLoadingLogin: boolean
    error: string | null
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoadingLogin, setIsLoadingLogin] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const login = async (userLoginData: UserLoginData) => {
        try {
            setIsLoadingLogin(true)
            setError(null) // Limpiar errores previos
            // Realizar el request al backend
            const response = await fetch('http://localhost:3000/happyart/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(userLoginData), // Enviar datos del formulario al backend
            })

            if (!response.ok) {
                // Manejar errores de autenticación
                const errorResponse = await response.json()
                throw new Error(errorResponse.message || 'Error en el inicio de sesión')
            }

            const data: User = await response.json() // Obtener la respuesta del backend
            setUser(data) // Guardar usuario en el estado
            setIsAuthenticated(true) // Marcar como autenticado
            navigate('/')
        } catch (error: any) {
            setError(error.message || 'Ocurrió un error') // Manejar errores
        } finally {
            setIsLoadingLogin(false)
        }
    }

    const register = async (userRegisterData: UserRegisterData) => {
        const userAddressFormated = () => {
            return userRegisterData.allAddress.map((separatedAddress) => ({
                tipo: separatedAddress.type,
                direccion: `${separatedAddress.region}, ${separatedAddress.commune}, ${separatedAddress.addressDetail}`,
            }))
        }

        const userData = {
            firstname: userRegisterData.firstName,
            lastname: userRegisterData.lastName,
            email: userRegisterData.mail,
            password: userRegisterData.password,
            phone: '+' + String(userRegisterData.phone),
            addresses: userAddressFormated(),
        }

        console.log('Datos enviados al backend:', userData)

        try {
            setIsLoadingLogin(true)
            setError(null)

            const response = await fetch('http://localhost:3000/happyart/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                const errorResponse = await response.json()
                console.error('Error del backend:', errorResponse)
                throw new Error(errorResponse.message || 'Error en el registro')
            }

            const data = await response.json()
            console.log('Respuesta del backend:', data)
            setIsAuthenticated(true)
            navigate('/')
        } catch (error: any) {
            console.error('Error en el registro:', error.message)
            setError(error.message || 'Ocurrió un error')
        } finally {
            setIsLoadingLogin(false)
        }
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <UserContext.Provider
            value={{ user, isAuthenticated, isLoadingLogin, login, logout, error, register }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
