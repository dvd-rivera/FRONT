// routes.js
import CartPage from "./pages/Cart.page";
import HomePage from "./pages/Home.page";
import LoginPage from "./pages/Login.page";
import MaintainerPage from "./pages/Maintainer.page";
import NewProductPage from "./pages/NewProduct.page";
import ProductDetailPage from "./pages/ProductDetail.page";
import ProfilePage from "./pages/Profile.page";
import RegisterPage from "./pages/Register.page";

const routes = [
  { path: "/cart", component: CartPage },
  { path: "/", component: HomePage, exact: true },
  { path: "/login", component: LoginPage },
  { path: "/maintainer", component: MaintainerPage },
  { path: "/new-product", component: NewProductPage },
  { path: "/product-detail", component: ProductDetailPage },
  { path: "/profile", component: ProfilePage },
  { path: "/register", component: RegisterPage },
];

export default routes;
