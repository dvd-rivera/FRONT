import React, { useContext } from 'react'
import { CartContext } from '../context/cart.context'
import { ProductContext } from '../context/products.context'
import Button from '@mui/material/Button';

const CartPage: React.FC = () => {
    const cartContext = useContext(CartContext)
    const { products } = useContext(ProductContext) || { products: [] } // Usar productos para obtener el stock

    if (!cartContext) {
        return <p>Error: Carrito no disponible.</p>
    }

    const { productsInCart, setProductsInCart } = cartContext

    // Función para aumentar la cantidad de un producto, limitado por el stock
    const increaseQuantity = (productId: number) => {
        const product = products.find((p) => p.id === productId)
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

    // Función para vaciar el carrito con confirmación
    const clearCart = () => {
        const confirmClear = window.confirm("¿Estás seguro de que deseas vaciar el carrito?")
        if (confirmClear) {
            setProductsInCart([]) // Establece el carrito como un array vacío
        }
    }

    // Calcular el total general del carrito
    const totalCart = productsInCart.reduce((total, item) => total + item.price * item.cant, 0)

    return (
        <section className="cart-section">
            <div className="container flex-col">
                <h2>Mi Carro de Compras</h2>
                <div className="cart-header">
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
                                    <img src={product.img} alt="Imagen del producto" />
                                </div>
                                <div>
                                    <p>{product.name}</p>
                                </div>
                            </div>
                            <div className="product-id">{product.id}</div>
                            <div className="product-price">${product.price}</div>
                            <div className="product-quantity">
                                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                <span>{product.cant}</span>
                                <button onClick={() => increaseQuantity(product.id)}>+</button>
                            </div>
                            <div className="product-total">${product.price * product.cant}</div>
                        </div>
                    ))}
                </div>
                <div className="cart-total">
                    <p>
                        <strong>TOTAL</strong> ${totalCart}
                    </p>
                </div>
                {/* Mostrar el botón "Vaciar carro" solo si hay productos en el carrito */}
                {productsInCart.length > 0 && (
                    <Button variant="contained" onClick={clearCart}>Vaciar carro</Button>
                )}
                <div className="cart-footer">
                    <p>
                        Los pedidos se realizarán a través de WhatsApp donde podrá continuar con la
                        compra.
                    </p>
                    <button className="checkout-button">Realizar Pedido</button>
                </div>
            </div>
        </section>
    )
}

export default CartPage
