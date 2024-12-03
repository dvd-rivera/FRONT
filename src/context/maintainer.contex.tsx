import React, { createContext, useContext, useState } from 'react'
import { ProductDefault, UpdateProductDefault } from '../models/productos.interface'
import BASE_URL from '../../env'
import { NewTheme } from '../models/themes.interface'
import { ProductContext } from './products.context'

// Define la interfaz del contexto
interface MaintainerContextType {
    newSelectedProduct: ProductDefault | null
    updateProduct: (product: UpdateProductDefault) => Promise<void>
    addProduct: (product: ProductDefault) => Promise<void>
    addTheme: (theme: NewTheme) => Promise<void>
    addCategory: () => Promise<void>
}

// Crear el contexto
export const MaintainerContext = createContext<MaintainerContextType | undefined>(undefined)

// Proveedor del contexto
export const MaintainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [newSelectedProduct, setNewSelectedProduct] = useState<ProductDefault | null>(null)

    // Acceso al contexto de productos
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error(
            'ProductContext no está disponible. Asegúrate de envolver MaintainerProvider con ProductContextProvider.'
        )
    }
    const { loadAllProducts } = productContext

    // Actualiza un producto seleccionado
    const updateProduct = async (product: UpdateProductDefault) => {
        const token = localStorage.getItem('Auth') // Obtiene el token del localStorage
        if (!token) {
            console.error('No se encontró un token en localStorage')
            return
        }

        const updateProductData = {
            description: product.description,
            price: product.price,
            stock: product.stock,
            other_attributes: product.other_attributes,
            img: product.img,
            type_id: product.type_id,
            theme_id: product.theme_id,
        }

        try {
            const response = await fetch(
                `${BASE_URL}/happyart/api/v1/products/${product.product_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(updateProductData),
                }
            )

            if (!response.ok) {
                throw new Error('Error al actualizar el producto')
            }

            const data = await response.json()
            setNewSelectedProduct(data)

            // Recarga los productos después de actualizar
            if (loadAllProducts) {
                await loadAllProducts()
            }
        } catch (error) {
            console.error('Error en updateProduct:', error)
        }
    }

    // Agrega un nuevo producto
    const addProduct = async (product: ProductDefault) => {
        try {
            const response = await fetch(`${BASE_URL}/happyart/api/v1/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })

            if (!response.ok) {
                throw new Error('Error al agregar el producto')
            }

            const data = await response.json()
            console.log('Producto agregado:', data)

            // Recarga los productos después de agregar
            if (loadAllProducts) {
                await loadAllProducts()
            }
        } catch (error) {
            console.error('Error en addProduct:', error)
        }
    }

    // Agrega una nueva temática
    const addTheme = async (newTheme: NewTheme) => {
        try {
            const response = await fetch(`${BASE_URL}/happyart/api/v1/themes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTheme),
            })

            if (!response.ok) {
                throw new Error('Error al agregar la temática')
            }

            const data = await response.json()
            console.log('Temática agregada:', data)

            // Opcional: Recarga productos si las temáticas impactan el listado
        } catch (error) {
            console.error('Error en addTheme:', error)
        }
    }

    // Agrega una nueva categoría
    const addCategory = async () => {
        try {
            const response = await fetch(`${BASE_URL}/happyart/api/v1/products/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Datos de la nueva categoría
                }),
            })

            if (!response.ok) {
                throw new Error('Error al agregar la categoría')
            }

            const data = await response.json()
            console.log('Categoría agregada:', data)

            // Opcional: Recarga productos si las categorías impactan el listado
        } catch (error) {
            console.error('Error en addCategory:', error)
        }
    }

    return (
        <MaintainerContext.Provider
            value={{
                newSelectedProduct,
                updateProduct,
                addProduct,
                addTheme,
                addCategory,
            }}
        >
            {children}
        </MaintainerContext.Provider>
    )
}
