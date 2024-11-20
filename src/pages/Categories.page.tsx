import React, { useContext } from 'react'
import { ProductContext } from '../context/products.context'
import { CartContext } from '../context/cart.context'

const CategoriesPage: React.FC = ({}) => {
    const productContext = useContext(ProductContext)
    const cartContext = useContext(CartContext)

    console.log(productContext?.products)

    return (
        <section className="section">
            <div className="container">hola</div>
        </section>
    )
}

export default CategoriesPage
