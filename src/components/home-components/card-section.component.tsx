import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/products.context'
import { CartContext } from '../../context/cart.context'
import { Product } from '../../models/productos.interface'
import { Link } from 'react-router-dom'

interface ProductCardsProps {
    productType: string
}

const CardSection: React.FC<ProductCardsProps> = ({ productType }) => {
    const { products } = useContext(ProductContext) || { products: [] }
    const cartContext = useContext(CartContext)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    useEffect(() => {
        // Filtrar productos según el tipo
        const filtered = products.filter((product) => product.type === productType)
        setFilteredProducts(filtered)
    }, [products, productType])

    const addToCart = (product: Product) => {
        if (!cartContext) {
            console.error('Cart context is undefined')
            return
        }

        const { productsInCart, setProductsInCart } = cartContext

        const existingProductIndex = productsInCart.findIndex((p) => p.id === product.id)

        if (existingProductIndex >= 0) {
            const updatedProducts = [...productsInCart]
            updatedProducts[existingProductIndex].cant += 1
            setProductsInCart(updatedProducts)
        } else {
            const productInCart = {
                id: product.id,
                name: product.type + ' ' + (product.theme.name[0] || 'Producto sin descripción'),
                price: product.price,
                cant: 1,
                img: product.img,
            }
            setProductsInCart([...productsInCart, productInCart])
        }
    }

    return (
        <section className="products-cards-section">
            <div className="container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="img-container">
                                <img src={product.img} alt={'imagen de ' + product.theme.name[0]} />
                            </div>
                            <div className="product-card-body">
                                <h3 className="product-name">{productType}</h3>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">Precio: ${product.price}</p>
                            </div>
                            <div className="product-card-footer">
                                <button onClick={() => addToCart(product)}>
                                    Agregar al carrito
                                </button>
                                <button className="detail">
                                    <Link to={'/product-detail/' + product.id}>Detalle</Link>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles</p>
                )}
            </div>
        </section>
    )
}

export default CardSection
