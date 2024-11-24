import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SearchComponent from './nav-components/search.component'
import NavCartComponent from './nav-components/navCart.component'
import CategoriesMenu from './nav-components/categoriesMenu.component'
import MenuIcon from '@mui/icons-material/Menu'
import UserMenu from './nav-components/userMenu.component'

const NavComponent: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('overflow-hidden')
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.body.classList.remove('overflow-hidden')
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuOpen])

    return (
        <nav className="bg-white fixed top-0 left-0 w-full z-10">
            <div className="flex lg:w-11/12 xl:w-10/12 mx-auto py-2 px-4">
                <div className="lg:w-2/12 w-full justify-between flex">
                    <Link to="/" className="flex justify-center align-center">
                        <img src="/img/happyArt-h.svg" alt="Logo Happy Art" />
                    </Link>
                    <div className="block lg:hidden text-3xl">
                        <button onClick={handleMenuToggle}>
                            <MenuIcon />
                        </button>
                    </div>
                </div>

                <div
                    ref={menuRef}
                    className={`flex lg:w-10/12 items-center justify-start lg:justify-between bg-white lg:h-auto h-screen absolute lg:relative top-0 ${
                        menuOpen ? 'left-0' : '-left-full'
                    } flex-col lg:flex-row py-4 lg:py-0 transition-all duration-500 lg:left-0`}
                >
                    <div className="lg:w-3/12">
                        <div className="flex justify-center lg:hidden">
                            <Link to="/">
                                <img
                                    className="my-4"
                                    src="/img/happyArt-h.svg"
                                    alt="Logo Happy Art"
                                />
                            </Link>
                        </div>
                        <div className="Categories-container rounded lg:block  hover:text-zinc-950">
                            <CategoriesMenu />
                        </div>
                    </div>
                    <div className="search-container mx-4 my-3 lg:my-0">
                        <SearchComponent />
                    </div>

                    <div className="personalized-link-container mx-4 transition  hover:text-zinc-950 px-4 rounded-md my-1 lg:my-0 lg:w-auto w-full lg:text-left text-center py-3">
                        <Link to="/personalizados" className="font-bold">
                            Personalizados
                        </Link>
                    </div>
                    <div className="flex lg:w-9/12 items-center justify-end flex-col lg:flex-row">
                        <UserMenu></UserMenu>
                        <div className="cart-container my-3 lg:my-0 order-1 lg:order-last">
                            <Link to="/cart" className="hover:text-zinc-950">
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
