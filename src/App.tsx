// App.js
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import routes from './routes'
import Nav from './components/Nav.component'
import FooterComponent from './components/Footer.component'
import ProductContextProvider from './context/products.context'
import { CartContextProvider } from './context/cart.context'
import UserContextProvider from './context/user.context'
import CategoriesContextProvider from './context/categories.context'
import ScrollToTop from './components/utils/scrollToTop.component'
import { MaintainerProvider } from './context/maintainer.contex'

function App() {
    return (
        <BrowserRouter>
            <ProductContextProvider>
                <MaintainerProvider>
                    <ScrollToTop />
                    <CategoriesContextProvider>
                        <UserContextProvider>
                            <CartContextProvider>
                                <Nav />
                                <Routes>
                                    {routes.map((route, index) => (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={route.element}
                                        />
                                    ))}
                                </Routes>
                                <FooterComponent />
                            </CartContextProvider>
                        </UserContextProvider>
                    </CategoriesContextProvider>
                </MaintainerProvider>
            </ProductContextProvider>
        </BrowserRouter>
    )
}

export default App
