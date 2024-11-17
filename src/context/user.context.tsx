// UserContext.js
import React, { createContext, useState } from 'react'
import { User, UserLoginData } from '../models/user.interface'

interface UserContextType {
    user: User | null
    isAuthenticated: boolean
    login: (userLoginData: UserLoginData) => void
    logout: () => void
    isLoadingLogin: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoadingLogin, setIsLoadingLogin] = useState(false)

    const login = async (userLoginData: UserLoginData) => {
        try {
            userLoginData = { ...userLoginData, email: 'hola' } //borrar despues
            setIsLoadingLogin(true)
            const response = await fetch('src/assets/user.json') // cambiar por API login y pasarle userLoginData por el body
            const data: User = await response.json()
            setUser(data)
        } catch (error) {
            setIsAuthenticated(true)
        } finally {
            setIsLoadingLogin(false)
        }
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <UserContext.Provider value={{ user, isAuthenticated, isLoadingLogin, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
