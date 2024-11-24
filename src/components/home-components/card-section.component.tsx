import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/products.context';
import { CartContext } from '../../context/cart.context';
import { ProductDefault } from '../../models/productos.interface';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom';

interface ProductCardsProps {
  productType: string;
}

const CardSection: React.FC<ProductCardsProps> = ({ productType }) => {
  const { products, isLoadingAllProducts } = useContext(ProductContext) || { products: [] };
  const cartContext = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState<ProductDefault[]>([]);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // Control para la transición
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (isLoadingAllProducts) {
      console.log('No hay productos disponibles o productos aún no cargados.');
    } else {
      const filtered = products.filter((product) => product.type_name === productType);
      setFilteredProducts(filtered);
    }
  }, [products, productType, isLoadingAllProducts]);

  const handleClick = (message: string) => {
    setSnackbarMessage(message);
    setOpen(true);

    // Espera un ciclo de renderizado para aplicar la clase `opacity-100`
    setTimeout(() => {
      setVisible(true);
    }, 10);

    // Después de un tiempo, inicia la transición de salida y desmonta el snackbar
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => setOpen(false), 300); // Espera que termine la transición de salida
    }, 2500);
  };

  const closeSnackbar = () => {
    setVisible(false); // Inicia la transición de opacidad
    setTimeout(() => setOpen(false), 300); // Espera que termine antes de desmontar
  };

  const addToCart = (product: ProductDefault) => {
    if (!cartContext) {
      console.error('Cart context is undefined');
      return;
    }

    const { productsInCart = [], setProductsInCart } = cartContext;
    const existingProductIndex = productsInCart.findIndex((p) => p.id === product.product_id);

    if (existingProductIndex >= 0) {
      const existingProduct = productsInCart[existingProductIndex];
      if (existingProduct.cant < product.stock) {
        const updatedProducts = [...productsInCart];
        updatedProducts[existingProductIndex].cant += 1;
        setProductsInCart(updatedProducts);
        handleClick(`Has agregado ${product.description} al carrito`);
      } else {
        alert(`No puedes agregar más de ${product.stock} unidades de este producto.`);
      }
    } else {
      if (product.stock > 0) {
        const productInCart = {
          id: product.product_id,
          name: `${product.type_name} ${product.theme_name?.name?.[0] || ''}`,
          price: product.price,
          cant: 1,
          img: product.img,
        };
        setProductsInCart([...productsInCart, productInCart]);
        handleClick(`Has agregado ${product.description} al carrito`);
      } else {
        alert('Este producto no tiene stock disponible.');
      }
    }
  };

  return (
    <section className="products-cards-section md:w-9/12 mx-auto  py-8">
      <div className="container mx-auto px-4">
        {filteredProducts.length > 0 ? (
          <div className="w-full flex flex-nowrap justify-center">
            {filteredProducts.map((product) => (
              <Link
                to={`/product-detail/${product.product_id}`}
                key={product.product_id}
                className="product-card w-6/12 lg:w-3/12 mx-2 my-2 bg-white transition-shadow transform shadow-md hover:shadow-lg shadow-gray-500/50 hover:shadow-gray-500/50 
  rounded-md overflow-hidden group flex flex-col justify-between"
              >
                <div className="img-container h-48 overflow-hidden">
                  <img
                    src={product.img}
                    alt={`Imagen de ${product.theme_name?.name?.[0] || 'Producto'}`}
                    className="w-full h-full object-cover transition-transform duration-300 object-top group-hover:scale-105"
                  />
                </div>
                <div className="product-card-body p-4">
                  <h3 className="product-name text-sm uppercase text-gray-400">
                    {productType}
                  </h3>
                  <h2 className="product-description font-bold text-md mb-2 text-gray-600">
                    {product.description}
                  </h2>
                </div>
                <div className="relative flex justify-between items-center px-3 py-2 group">
                  <div className="flex w-full transition-all duration-300 group-hover:w-full">
                    <button
                      className="flex items-center justify-center bg-white border border-blue-500 text-blue-500 h-10 px-3 rounded transition-all duration-300 transform group-hover:w-full group-hover:bg-blue-500 group-hover:text-white focus:outline-none"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                    >
                      <ShoppingCartIcon className="transition-colors group-hover:text-white mr-2" />
                      <span className="hidden group-hover:inline-block transition-opacity duration-300">
                        Agregar al carrito
                      </span>
                    </button>
                  </div>
                  <p className="product-price text-3xl font-bold text-right text-blue-500 transition-opacity duration-300 group-hover:opacity-0 group-hover:delay-300 group-hover:hidden">
                    ${product.price.toLocaleString('es-CL')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay productos disponibles</p>
        )}
        {open && (
          <div
            className={`snackbar-container z-20 fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="flex items-center justify-between">
              <span>{snackbarMessage}</span>
              <button
                className="ml-4 text-white hover:text-gray-300 focus:outline-none"
                onClick={closeSnackbar}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardSection;
