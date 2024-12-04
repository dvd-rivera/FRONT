import React, { useContext, useState } from 'react'
import { CartContext } from '../context/cart.context'
import { ProductContext } from '../context/products.context'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const CartPage: React.FC = () => {
    const cartContext = useContext(CartContext)
    const { products } = useContext(ProductContext) || { products: [] } // Usar productos para obtener el stock
    const [ isModalOpen, setModalOpen] = useState(false) // Estado para el modal

    if (!cartContext) {
        return <p>Error: Carrito no disponible.</p>
    }

    const { productsInCart, setProductsInCart } = cartContext

    // Función para aumentar la cantidad de un producto, limitado por el stock
    const increaseQuantity = (productId: number) => {
        const product = products.find((p) => p.product_id === productId)
        const stock = product?.stock ?? 0
        const updatedCart = productsInCart.map((item) =>
            item.id === productId && item.cant < stock ? { ...item, cant: item.cant + 1 } : item
        )
        setProductsInCart(updatedCart)
    }

    // Función para disminuir la cantidad de un producto
    const decreaseQuantity = (productId: number) => {
        const updatedCart = productsInCart
            .map((item) => (item.id === productId ? { ...item, cant: item.cant - 1 } : item))
            .filter((item) => item.cant > 0) // Eliminar productos con cantidad menor a 1
        setProductsInCart(updatedCart)
    }

    // Función para abrir el modal
    const handleOpenModal = () => {
        setModalOpen(true)
    }

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setModalOpen(false)
    }

    // Función para vaciar el carrito
    const clearCart = () => {
        setProductsInCart([]) // Establece el carrito como un array vacío
        handleCloseModal() // Cerrar el modal
    }



    // Calcular el total general del carrito
    const totalCart = productsInCart.reduce((total, item) => total + item.price * item.cant, 0)

    return (
        <section className="section cart-section">
            <div className="container cart-container">
                <div className="cart-header">
                    <h2>Mi Carro de Compras</h2>
                </div>
                <div className="cart-body">
                    <div className="cart-headers">
                        <span className="product-info-header">Producto</span>
                        <span className="product-id-header">ID</span>
                        <span className="product-price-header">Precio</span>
                        <span className="product-quantity-header">Cantidad</span>
                        <span className="product-total-header">Total</span>
                    </div>
                    <div className="cart-items">
                        {productsInCart.map((product) => (
                            <div key={product.id} className="cart-item">
                                <div className="product-info">
                                    <div className="product-thumbnail">
                                        <img src={product.img[0]} alt="Imagen del producto" />
                                    </div>
                                    <div>
                                        <p>{product.name}</p>
                                    </div>
                                </div>
                                <div className="product-id">{product.id}</div>
                                <div className="product-price">
                                    $ {product.price.toLocaleString('cl-CL')}
                                </div>
                                <div className="product-quantity">
                                    <button
                                        className="btn-qty"
                                        onClick={() => decreaseQuantity(product.id)}
                                    >
                                        -
                                    </button>
                                    <span>{product.cant}</span>
                                    <button
                                        className="btn-qty"
                                        onClick={() => increaseQuantity(product.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="product-total">
                                    ${(product.price * product.cant).toLocaleString('cl-CL')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cart-side">
                    <p>
                        Los pedidos se realizarán a través de WhatsApp donde podrá continuar con la
                        compra.
                    </p>
                    <div className="total-price">
                        <strong style={{ paddingRight: '8px' }}>TOTAL</strong> $
                        {totalCart.toLocaleString('cl-CL')}
                    </div>

                    <div className="cart-side-footer">
                        {productsInCart.length > 0 && (
                            <>
                                <Button className="btn-vaciar" onClick={handleOpenModal}>
                                    Vaciar carro
                                </Button>
                                <Dialog
                                    open={isModalOpen}
                                    onClose={handleCloseModal}
                                    aria-labelledby="vaciar-carro-title"
                                >
                                    <DialogTitle id="vaciar-carro-title">
                                        Vaciar carrito
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            ¿Estás seguro de que deseas vaciar el carrito?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseModal} color="primary">
                                            Cancelar
                                        </Button>
                                        <Button onClick={clearCart} color="secondary" autoFocus>
                                            Confirmar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )}
                        <button className="checkout-button">Realizar Pedido</button>
                    </div>
                </div>
                <div className="cart-footer"></div>
            </div>
        </section>
    )
}

export default CartPage
