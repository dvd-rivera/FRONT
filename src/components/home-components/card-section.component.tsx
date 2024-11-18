import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/products.context';
import { CartContext } from '../../context/cart.context';
import { Product } from '../../models/productos.interface';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ProductCardsProps {
  productType: string;
}

const CardSection: React.FC<ProductCardsProps> = ({ productType }) => {
  const { products } = useContext(ProductContext) || { products: [] };
  const cartContext = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  useEffect(() => {
    const filtered = products.filter((product) => product.type === productType);
    setFilteredProducts(filtered);
  }, [products, productType]);

  const handleClick = (message: string) => {
    setSnackbarMessage(message); // Establece el mensaje
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const addToCart = (product: Product) => {
    if (!cartContext) {
      console.error('Cart context is undefined');
      return;
    }

    const { productsInCart, setProductsInCart } = cartContext;
    const existingProductIndex = productsInCart.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex >= 0) {
      const existingProduct = productsInCart[existingProductIndex];
      if (existingProduct.cant < product.stock) {
        const updatedProducts = [...productsInCart];
        updatedProducts[existingProductIndex].cant += 1;
        setProductsInCart(updatedProducts);
        handleClick(
          `Has agregado <strong>${product.description}</strong> al carrito`
        );
      } else {
        alert(`No puedes agregar más de ${product.stock} unidades de este producto.`);
      }
    } else {
      if (product.stock > 0) {
        const productInCart = {
          id: product.id,
          name: product.type + ' ' + (product.theme.name[0] || 'Producto sin descripción'),
          price: product.price,
          cant: 1,
          img: product.img,
        };
        setProductsInCart([...productsInCart, productInCart]);
        handleClick(
          `Has agregado <strong>${product.description}</strong> al carrito`
        );
      } else {
        alert('Este producto no tiene stock disponible.');
      }
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <section className="products-cards-section">
      <div className="container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={'/product-detail/' + product.id}
              key={product.id}
              className="product-card overflow-hidden rounded"
            >
              <div className="img-container">
                <img
                  src={product.img}
                  alt={'imagen de ' + product.theme.name[0]}
                />
              </div>
              <div className="product-card-body">
                <h3 className="product-name">{productType}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Precio: ${product.price}</p>
              </div>
              <div className="flex justify-center py-2">
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  Agregar al carrito
                </Button>
              </div>
            </Link>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          message={
            <span dangerouslySetInnerHTML={{ __html: snackbarMessage }} />
          }
          action={action}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: '#ff8dc0', 
              color: 'white', 
              fontWeight: 'normal', 
            },
          }}
        />
      </div>
    </section>
  );
};

export default CardSection;
