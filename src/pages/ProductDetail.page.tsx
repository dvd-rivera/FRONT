import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../context/products.context'
import { CartContext } from '../context/cart.context'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { products } = useContext(ProductContext) || { products: [] }
  const cartContext = useContext(CartContext)

  const product = products.find((p) => p.product_id === parseInt(id || '', 10))

  const initialQuantity =
    cartContext?.productsInCart.find((p) => p.id === product?.product_id)?.cant || 0
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  const updateQuantity = (change: number) => {
    if (product) {
      const newQuantity = quantity + change
      if (newQuantity >= 0 && newQuantity <= product.stock) {
        setQuantity(newQuantity)
      } else if (newQuantity > product.stock) {
        setIsModalOpen(true)
      }
    }
  }

  const addToCart = () => {
    if (product && cartContext) {
      const { productsInCart, setProductsInCart } = cartContext

      const existingProductIndex = productsInCart.findIndex(
        (p) => p.id === product.product_id
      )

      if (existingProductIndex >= 0) {
        const updatedProducts = [...productsInCart]
        updatedProducts[existingProductIndex].cant += quantity
        setProductsInCart(updatedProducts)
      } else {
        const productInCart = {
          id: product.product_id,
          name:
            product.type_name +
            ' ' +
            (product.theme_name?.name[0] || 'Producto sin descripción'),
          price: product.price,
          cant: quantity,
          img: product.img,
        }
        setProductsInCart([...productsInCart, productInCart])
      }

      const addedQuantity = quantity; // Almacena la cantidad agregada
      setSnackbarMessage(`Se han agregado ${addedQuantity} unidades de ${product?.description} al carrito.`)
      setSnackbarOpen(true)
      setVisible(true)

      setTimeout(() => setVisible(false), 2500)
      setTimeout(() => setSnackbarOpen(false), 2800)
      setQuantity(0)
    }
  }

  const closeSnackbar = () => {
    setVisible(false)
    setTimeout(() => setSnackbarOpen(false), 300)
  }

  return (
    <div className="mt-24 md:w-9/12 mx-auto bg-white py-4 rounded-lg shadow-lg">
      {product ? (
        <>
          <div className="flex">
            <div className="w-7/12">
              <img className="w-full px-12 mt-2" src={product.img[0]} alt="" />
            </div>
            <div className="w-5/12">
              <p className="text-gray-400 text-xl my-1">{product.type_name}</p>
              <p className="product-description font-bold text-md mb-2 text-4xl text-gray-600">
                {product.description}
              </p>
              <p className="text-gray-400 my-1">Sku: {product.product_id}</p>
              <p className="text-gray-500">
                <span className="font-bold">Stock: </span>
                {product.stock}
              </p>
              <p className="font-bold text-5xl text-blue-500 my-8">
                ${product.price.toLocaleString('es-CL')}
              </p>

              <div className="flex w-fit rounded-md overflow-hidden my-4 bg-white">
                <button
                  className="bg-gray-300 px-4 py-2"
                  onClick={() => updateQuantity(-1)}
                >
                  -
                </button>
                <p className="px-4 py-2">{quantity}</p>
                <button
                  className="bg-gray-300 px-4 py-2"
                  onClick={() => updateQuantity(1)}
                >
                  +
                </button>
              </div>
              <div className="pr-5">
                <button
                  className={`flex items-center w-full justify-center bg-white border border-blue-500 text-blue-500 h-10 px-3 rounded transition-all duration-300 transform ${quantity === 0 || !product
                    ? 'opacity-50 cursor-not-allowed'
                    : 'group-hover:w-full hover:bg-blue-500 hover:text-white'
                    } focus:outline-none`}
                  onClick={addToCart}
                  disabled={quantity === 0 || !product}
                >
                  <ShoppingCartIcon className={`transition-colors ${quantity === 0 || !product ? '' : 'group-hover:text-white'
                    }`} />
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Producto no encontrado</p>
      )}

      {/* Snackbar */}
      {/* Snackbar */}
      {snackbarOpen && (
        <div
          className={`snackbar-container z-20 fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="flex items-center justify-between">
            <span>{snackbarMessage}</span>
            <button
              className="ml-4 text-white hover:text-gray-300 focus:outline-none"
              onClick={closeSnackbar}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Modal para stock excedido */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Aviso
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            No puedes agregar más de {product?.stock} unidades.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default ProductDetailPage
