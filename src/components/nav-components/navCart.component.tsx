import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { CartContext } from '../../context/cart.context'

const NavCartComponent: React.FC = () => {
    const cartContext = useContext(CartContext)

    if (!cartContext) {
        return null
    }

    const { productsInCart } = cartContext

    const totalItems = productsInCart.reduce((total, product) => total + product.cant, 0)

    const qtyCart = 'absolute bg-slate-200 rounded-xl py-1 px-2 text-xs top-0 right-0'

    return (
        <div className="relative p-3">
            <ShoppingCartIcon style={{ fontSize: 32, color: '#000000' }} />
            {totalItems > 0 && <span className={qtyCart}>{totalItems}</span>}
        </div>
    )
}

export default NavCartComponent
