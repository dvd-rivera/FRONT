import React from 'react'
import { Link } from 'react-router-dom'
import ThemeSelectorComponent from './nav-components/themeSelector.component'
import SearchComponent from './nav-components/search.component'
import NavCartComponent from './nav-components/navCart.component'

const NavComponent: React.FC = () => {
    return (
        <nav className="nav-container">
            <div className="nav-inner-container">
                <div className="brand-container">
                    <Link to="/">
                        <img src="img/happyArt-h.svg" alt="Logo Happy Art" />
                    </Link>
                </div>
                <div className="Themes-container">
                    <ThemeSelectorComponent />
                </div>
                <div className="search-container">
                    <SearchComponent />
                </div>
                <div className="personalized-link-container">
                    <Link to="/personalizados">Personalizados</Link>
                </div>
                <div className="login-container">
                    <Link to="/login">Inicia sesión</Link>
                </div>
                <div className="cart-container">
                    <Link to="/cart">
                        <NavCartComponent />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavComponent
