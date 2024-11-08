import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const NavCartComponent: React.FC = () => {
    return (
        <>
            <Link to="/cart">
                <ShoppingCartIcon style={{ fontSize: 32, color: '#000000' }}></ShoppingCartIcon>
            </Link>
        </>
    )
}

export default NavCartComponent
