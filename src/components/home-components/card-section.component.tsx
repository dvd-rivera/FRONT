import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/products.context';
import { CartContext } from '../../context/cart.context';
import { ProductDefault } from '../../models/productos.interface';
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
                className="product-card w-3/12 mx-5 my-3 bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="img-container h-48 overflow-hidden">
                  <img
                    src={product.img}
                    alt={`Imagen de ${product.theme_name?.name?.[0] || 'Producto'}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="product-card-body p-4">
                  <h3 className="product-name text-lg font-semibold text-gray-800">
                    {productType}
                  </h3>
                  <p className="product-description text-sm text-gray-600">
                    {product.description}
                  </p>
                  <p className="product-price text-base font-bold text-gray-900">
                    Precio: ${product.price}
                  </p>
                </div>
                <div className="flex justify-center py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay productos disponibles</p>
        )}
        {open && (
          <div
            className={`snackbar-container fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${
              visible ? 'opacity-100' : 'opacity-0'
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
