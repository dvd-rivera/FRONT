// UserContext.js
import React, { createContext, useEffect, useState } from 'react'
import { User, UserLoginData, UserReconected, UserRegisterData } from '../models/user.interface'
import { useNavigate } from 'react-router-dom'

interface UserContextType {
    user: User | null
    isAuthenticated: boolean
    login: (userLoginData: UserLoginData) => void
    logout: () => void
    reconect: () => void
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
            const token = data.token
            const uID = data.id
            localStorage.setItem('Auth', token)
            localStorage.setItem('id', uID.toString())
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
        localStorage.removeItem('Auth')
        localStorage.removeItem('id')
    }

    const reconect = async () => {
        // Verificar si el token y el ID están almacenados
        const token = localStorage.getItem('Auth')
        const id = localStorage.getItem('id')

        let data: User = {
            id: 0,
            firstName: '',
            email: '',
            role: 'user',
            token: '',
        }

        if (token && id && user?.firstName == undefined) {
            try {
                setIsLoadingLogin(true)
                setError(null) // Limpiar errores previos

                // Realizar la solicitud al backend
                const response = await fetch(`http://localhost:3000/happyart/api/v1/users/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                    },
                })

                if (!response.ok) {
                    // Manejar errores del backend
                    const errorResponse = await response.json()
                    throw new Error(errorResponse.message || 'Error al reconectar')
                }

                const reconectData: Array<UserReconected> = await response.json() // Procesar la respuesta

                // Configurar datos del usuario
                data = {
                    id: reconectData[0].userid,
                    firstName: reconectData[0].firstname,
                    email: reconectData[0].email,
                    role: reconectData[0].role,
                    token: token,
                }

                setUser(data) // Guardar el usuario en el estado
                setIsAuthenticated(true) // Usuario autenticado
            } catch (error: any) {
                setError(error.message || 'Ocurrió un error durante la reconexión')
            } finally {
                setIsLoadingLogin(true) // Finalizar carga
            }
        } else {
            console.warn('No hay token o ID almacenado en localStorage.')
        }
    }

    useEffect(() => {
        if (!isAuthenticated || user?.firstName == undefined) {
            reconect()
        }
    }, [isAuthenticated])

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoadingLogin,
                login,
                logout,
                error,
                register,
                reconect,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
