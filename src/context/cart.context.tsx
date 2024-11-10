// CartContext.tsx
import React, { createContext, useState } from 'react'
import { ProductInCart } from '../models/productInCart.interface'

interface CartContextType {
  productsInCart: ProductInCart[]
  setProductsInCart: (productsInCart: ProductInCart[]) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState<ProductInCart[]>([])

  return (
    <CartContext.Provider value={{ productsInCart, setProductsInCart }}>
      {children}
    </CartContext.Provider>
  )
}
