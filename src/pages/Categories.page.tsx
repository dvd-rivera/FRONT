import React, { useContext, useEffect, useState } from "react";
import { Product } from "../models/productos.interface";
import { CartContext } from "../context/cart.context";
import { ProductContext } from "../context/products.context";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom'


interface ProductProps {
    productType: string
  }

const CategoriesPage: React.FC<ProductProps> = ({productType}) => {
    const { products } = useContext(ProductContext) || { products: [] }
    const cartContext = useContext(CartContext)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    useEffect(() => {
        // Filtrar productos según el tipo
        const filtered = products.filter((product) => product.type === productType)
        setFilteredProducts(filtered)
      }, [products, productType])

    const addToCart = (product: Product) => {
        if (!cartContext) {
          console.error('Cart context is undefined')
          return
        }
    
        const { productsInCart, setProductsInCart } = cartContext
        const existingProductIndex = productsInCart.findIndex((p) => p.id === product.id)
    
        if (existingProductIndex >= 0) {
          const existingProduct = productsInCart[existingProductIndex]
          if (existingProduct.cant < product.stock) {  // Verificar que no exceda el stock
            const updatedProducts = [...productsInCart]
            updatedProducts[existingProductIndex].cant += 1
            setProductsInCart(updatedProducts)
          } else {
            alert(`No puedes agregar más de ${product.stock} unidades de este producto.`)
          }
        } else {
          if (product.stock > 0) {  // Verificar que haya stock disponible antes de agregar
            const productInCart = {
              id: product.id,
              name: product.type + ' ' + (product.theme.name[0] || 'Producto sin descripción'),
              price: product.price,
              cant: 1,
              img: product.img,
            }
            setProductsInCart([...productsInCart, productInCart])
          } else {
            alert(`Este producto no tiene stock disponible.`)
          }
        }
      }

    
    return (<section className="products-cards-section ">
        <div className="container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={'/product-detail/' + product.id} key={product.id} className="product-card overflow-hidden rounded">
                <div className="img-container">
                  <img src={product.img} alt={'imagen de ' + product.theme.name[0]} />
                </div>
                <div className="product-card-body">
                  <h3 className="product-name">{productType}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">Precio: ${product.price}</p>
                </div>
                <div className="flex justify-center py-2">
                  <Button variant="contained" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
                    Agregar al carrito
                  </Button>
                </div>
              </Link>
            ))
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>
      </section>)
}

export default CategoriesPage