// App.js
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import routes from './routes'
import Nav from './components/Nav.component'
import FooterComponent from './components/Footer.component'
import ProductContextProvider from './context/products.context'
import { CartContextProvider } from './context/cart.context'
import UserContextProvider from './context/user.context'

function App() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <ProductContextProvider>
                    <CartContextProvider>
                        {/* <Router> */}
                        <Nav />
                        <Routes>
                            {routes.map((route, index) => (
                                <Route key={index} path={route.path} element={route.element} />
                            ))}
                        </Routes>
                        <FooterComponent />
                        {/* </Router> */}
                    </CartContextProvider>
                </ProductContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    )
}

export default App
