// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import routes from './routes'
import Nav from './components/Nav.component'
import FooterComponent from './components/Footer.component'
import ProductContextProvider from './context/products.context'
import { CartContextProvider } from './context/cart.context'

function App() {
    return (
        <ProductContextProvider>
            <CartContextProvider>
                <Router>
                    <Nav />
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                    <FooterComponent />
                </Router>
            </CartContextProvider>
        </ProductContextProvider>
    )
}

export default App
