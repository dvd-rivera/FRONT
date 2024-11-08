import React, { useContext } from 'react'
import { CartContext } from '../context/cart.context'

const CartPage: React.FC = () => {
    const cartContext = useContext(CartContext)

    if (!cartContext) {
        return <p>Error: Carrito no disponible.</p>
    }

    const { productsInCart, setProductsInCart } = cartContext

    // Función para aumentar la cantidad de un producto
    const increaseQuantity = (productId: number) => {
        const updatedCart = productsInCart.map((item) =>
            item.id === productId ? { ...item, cant: item.cant + 1 } : item
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

    // Calcular el total general del carrito
    const totalCart = productsInCart.reduce((total, item) => total + item.price * item.cant, 0)

    return (
        <section className="cart-section">
            <div className="container">
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
