import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { Product } from '../models/productos.interface'

interface ProductContextType {
    products: Product[]
    setProducts: (Products: Product[]) => void
    isLoadingAllProducts: boolean
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

const ProductContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(false)

    const loadAllProducts = async () => {
        setIsLoadingAllProducts(true)
        try {
            const response = await fetch('src/assets/products.json') //cambiar por la API que trae todos los productos
            const data = await response.json()
            console.log('Datos obtenidos:', data.products)
            setProducts(data.products)
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoadingAllProducts(false)
        }
    }

    useEffect(() => {
        loadAllProducts()
    }, [])

    return (
        <ProductContext.Provider value={{ products, setProducts, isLoadingAllProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider
