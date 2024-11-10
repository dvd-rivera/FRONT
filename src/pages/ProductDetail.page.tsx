// ProductDetailPage.tsx
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../context/products.context'
import { CartContext } from '../context/cart.context'

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { products } = useContext(ProductContext) || { products: [] }
  const cartContext = useContext(CartContext)

  const product = products.find((p) => p.id === parseInt(id || '', 10))

  // Verificar la cantidad inicial en el carrito si ya existe
  const initialQuantity = cartContext?.productsInCart.find(p => p.id === product?.id)?.cant || 0
  const [quantity, setQuantity] = useState(initialQuantity)

  const addToCart = () => {
    if (product && cartContext) {
      const { productsInCart, setProductsInCart } = cartContext
      const existingProductIndex = productsInCart.findIndex((p) => p.id === product.id)

      if (existingProductIndex >= 0) {
        const updatedProducts = [...productsInCart]
        updatedProducts[existingProductIndex].cant += 1
        setProductsInCart(updatedProducts)
      } else {
        const productInCart = {
          id: product.id,
          name: product.type + ' ' + (product.theme?.name[0] || 'Producto sin descripción'),
          price: product.price,
          cant: 1,
          img: product.img,
        }
        setProductsInCart([...productsInCart, productInCart])
      }

      setQuantity(quantity + 1)
    }
  }

  const removeFromCart = () => {
    if (product && cartContext && quantity > 0) {
      const { productsInCart, setProductsInCart } = cartContext
      const existingProductIndex = productsInCart.findIndex((p) => p.id === product.id)

      if (existingProductIndex >= 0) {
        const updatedProducts = [...productsInCart]
        if (updatedProducts[existingProductIndex].cant > 1) {
          updatedProducts[existingProductIndex].cant -= 1
          setProductsInCart(updatedProducts)
        } else {
          updatedProducts.splice(existingProductIndex, 1)
          setProductsInCart(updatedProducts)
        }

        setQuantity(quantity - 1)
      }
    }
  }

  return (
    <div className='mt-24 md:w-9/12 mx-auto'>
      {product ? (
        <>
          <div className="flex">
            <div className="w-6/12">
              <img className='w-full px-12 mt-2' src={product.img} alt="" />
            </div>
            <div className="w-6/12">
              <p className='font-bold my-1'>Sku: {product.id}</p>
              <p className='font-bold text-3xl uppercase mb-4 text-sky-500'>{product.description}</p>
              <p className='font-bold my-3'>Tipo: <span className='text-sky-400 '>{product.type}</span></p>
              <p className='font-bold text-2xl'>${product.price}</p>
              <p className='text-xl'><span className='font-bold'>Stock: </span>{product.stock}</p>
              <div className="flex w-fit rounded-md overflow-hidden my-4">
                <button className='bg-sky-500 px-4 py-2' onClick={removeFromCart}>-</button>
                <p className='px-4 py-2'>{quantity}</p>
                <button className='bg-sky-500 px-4 py-2' onClick={addToCart}>+</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  )
}

export default ProductDetailPage
