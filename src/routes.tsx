// routes.js
import CartPage from './pages/Cart.page'
import HomePage from './pages/Home.page'
import LoginPage from './pages/Login.page'
import MaintainerPage from './pages/Maintainer.page'
import NewProductPage from './pages/NewProduct.page'
import PersonalizedPage from './pages/Personalized.page'
import ProductDetailPage from './pages/ProductDetail.page'
import ProfilePage from './pages/Profile.page'
import RegisterPage from './pages/Register.page'

interface RouteConfig {
    path: string
    element: React.ReactNode
}

const routes: RouteConfig[] = [
    { path: '/cart', element: <CartPage></CartPage> },
    { path: '/', element: <HomePage></HomePage> },
    { path: '/login', element: <LoginPage></LoginPage> },
    { path: '/maintainer', element: <MaintainerPage></MaintainerPage> },
    { path: '/new-product', element: <NewProductPage></NewProductPage> },
    { path: '/product-detail/:id', element: <ProductDetailPage></ProductDetailPage> },
    { path: '/profile', element: <ProfilePage></ProfilePage> },
    { path: '/register', element: <RegisterPage></RegisterPage> },
    { path: '/personalizados', element: <PersonalizedPage></PersonalizedPage> },
]

export default routes
