import React, { createContext, useState, useEffect } from 'react'
import { ProductDefault } from '../models/productos.interface'

interface ProductContextType {
    products: ProductDefault[]
    setProducts: React.Dispatch<React.SetStateAction<ProductDefault[]>>
    isLoadingAllProducts: boolean
    loadAllProducts: () => void
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

const ProductContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ProductDefault[]>([])
    const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(true)

    const loadAllProducts = async () => {
        setIsLoadingAllProducts(true)
        try {
            const response = await fetch('http://localhost:3000/happyart/api/v1/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()

            if (data) {
                setProducts(data)
            } else {
                console.error('La respuesta de la API no contiene el formato esperado.')
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error)
        } finally {
            setIsLoadingAllProducts(false)
        }
    }

    useEffect(() => {
        loadAllProducts()
    }, [])

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                isLoadingAllProducts,
                loadAllProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider
