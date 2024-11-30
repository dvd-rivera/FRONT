import React, { useContext } from 'react'
import { ProductContext } from '../context/products.context'
import CardSection from '../components/home-components/card-section.component'
// import { CartContext } from '../context/cart.context'

const CategoriesPage: React.FC = () => {
    const productContext = useContext(ProductContext)
    // const cartContext = useContext(CartContext)

    console.log(productContext?.products)

    return (
        <section className="section">
            <CardSection limit="5" />
        </section>
    )
}

export default CategoriesPage
