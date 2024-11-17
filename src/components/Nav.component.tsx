import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import ThemeSelectorComponent from './nav-components/themeSelector.component'
import SearchComponent from './nav-components/search.component'
import NavCartComponent from './nav-components/navCart.component'
import CategoriesMenu from './nav-components/categoriesMenu.component'
import MenuIcon from '@mui/icons-material/Menu'
import { useEffect } from 'react';

const NavComponent: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [menuOpen]);

  return (
    <nav className='bg-white fixed top-0 left-0 w-full z-10 '>
      <div className="flex w-10/12 mx-auto py-2">
        <div className="md:w-2/12 w-full justify-between flex">
          <Link to="/">
            <img src="img/happyArt-h.svg" alt="Logo Happy Art" />
          </Link>
          <div className="block md:hidden text-3xl">
            <button onClick={handleMenuToggle}>
              <MenuIcon />
            </button>
          </div>
        </div>

        <div 
        className={`flex md:w-10/12 items-center justify-start md:justify-between bg-red-500 md:h-auto h-screen absolute md:relative top-0 ${menuOpen ? 'left-0' : '-left-full'} flex-col md:flex-row py-4 md:py-0 transition-all duration-500 md:left-0`}>
          <div className="md:w-3/12">
            <div className="block md:hidden">
              <Link to="/">
                <img src="img/happyArt-h.svg" alt="Logo Happy Art" />
              </Link>
            </div>
            <div className="Categories-container md:block ">
              <CategoriesMenu />
            </div>
          </div>
          <div className="flex md:w-9/12 items-center justify-end flex-col md:flex-row">
            <div className="search-container mx-4 my-3 md:my-0 order-2 md:order-last">
              <SearchComponent />
            </div>
            <div className="personalized-link-container mx-4 transition hover:bg-red-600 my-1 md:my-0 md:w-auto w-full md:text-left text-center py-3 order-3 md:order-last">
              <Link to="/personalizados">Personalizados</Link>
            </div>
            <div className="login-container mx-4 transition hover:bg-red-600 my-1 md:my-0 md:w-auto w-full md:text-left text-center py-3 order-2 md:order-last">
              <Link to="/login">Inicia sesión</Link>
            </div>
            <div className="cart-container my-3 md:my-0 order-1 md:order-last">
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