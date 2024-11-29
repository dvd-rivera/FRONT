import React, { createContext, useEffect, useState } from 'react'
import { Category } from '../models/productos.interface'
import BASE_URL from '../../env'

interface CategoriesContextType {
    categories: Array<Category>
}

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

const CategoriesContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Array<Category>>([])

    const getCategories = async () => {
        try {
            const response = await fetch(`${BASE_URL}/happyart/api/v1/types/allTypes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                const errorResponse = await response.json()
                console.error('Error del backend:', errorResponse)
                throw new Error(
                    errorResponse.message || 'Error en traer lista de categorias de productos'
                )
            }

            const data = await response.json()
            setCategories(data)
        } catch (error) {}
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <CategoriesContext.Provider
            value={{
                categories,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesContextProvider
