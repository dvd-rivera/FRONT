import React from 'react'
import { Link } from 'react-router-dom'
// import ThemeSelectorComponent from './nav-components/themeSelector.component'
import SearchComponent from './nav-components/search.component'
import NavCartComponent from './nav-components/navCart.component'
import CategoriesMenu from './nav-components/categoriesMenu.component'



const NavComponent: React.FC = () => {

  return (
    <nav className="nav-container">
      <div className="nav-inner-container">
        <div className="w-3/12">
          <Link to="/">
            <img src="img/happyArt-h.svg" alt="Logo Happy Art" />
          </Link>
        </div>

        <div className="flex w-9/12 items-center justify-between">
          <div className="w-3/12">
            <div className="Categories-container">
              <CategoriesMenu />
            </div>
          </div>
          <div className="flex w-9/12 items-center justify-end">
            <div className="search-container mx-4">
              <SearchComponent />
            </div>
            <div className="personalized-link-container  mx-4">
              <Link to="/personalizados">Personalizados</Link>
            </div>
            <div className="login-container mx-4">
              <Link to="/login">Inicia sesión</Link>
            </div>
            <div className="cart-container">
              <Link to="/cart">
                <NavCartComponent />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default NavComponent
