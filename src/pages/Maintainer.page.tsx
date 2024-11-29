import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate } from 'react-router-dom'
import { CategoriesContext } from '../context/categories.context'
import { ProductContext } from '../context/products.context'
import { ProductDefault } from '../models/productos.interface'
import MaintainerForm from '../components/MaintainerForm.component'

const MaintainerPage: React.FC = () => {
    const userStatus = useContext(UserContext)
    const categories = useContext(CategoriesContext)
    const products = useContext(ProductContext)
    const [catSelected, setCatSelected] = useState<string | null>(null) // Estado para guardar el id de la categoría seleccionada
    const navigate = useNavigate()
    const [productsList, setProductsList] = useState<Array<ProductDefault>>([])
    const [productSelected, setProductSelected] = useState<ProductDefault | null>(null)

    useEffect(() => {
        6
        if (!userStatus || userStatus.user?.role !== 'admin') navigate('/')
    }, [])

    useEffect(() => {
        if (catSelected) {
            const filteredProducts = products?.products.filter(
                (product) => product.type_name === catSelected
            )
            setProductSelected(null)
            // console.log('Productos filtrados:', filteredProducts)
            setProductsList(filteredProducts || []) // Si no hay productos filtrados, establece un array vacío
        } else {
            setProductsList([]) // Vacía la lista si no hay categoría seleccionada
        }
    }, [catSelected, products])

    const handleCategoryClick = (categoryName: string) => {
        setCatSelected(categoryName) // Actualiza el estado con el nombre de la categoría seleccionada
    }

    const handleProductClick = (product: ProductDefault) => {
        setProductSelected(product) // Selecciona un producto
        // console.log('Producto seleccionado:', product)
    }

    return (
        <section className="section maintainer-section">
            <div className="container maintainer-container">
                <div className="maintiner-header">
                    <h2>Configuración de Productos</h2>
                    <div className="buttons-container">
                        <button>Nuevo Producto</button>
                        <button>Nueva Categoría</button>
                        <button>Nueva Temática</button>
                    </div>
                </div>
                <div className="maintainer-body">
                    {/* Categorías */}
                    <div className="categories-container">
                        {categories?.categories ? (
                            categories.categories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`category-selector ${
                                        catSelected === category.name ? 'selected' : ''
                                    }`} // Agrega la clase "selected" si esta categoría está seleccionada
                                    onClick={() => handleCategoryClick(category.name)} // Maneja el clic
                                >
                                    {category.name}
                                </div>
                            ))
                        ) : (
                            <>No se han podido cargar las categorías...</>
                        )}
                    </div>

                    {/* Productos */}
                    <div className="products-container">
                        {productsList.length > 0 ? (
                            productsList.map((product) => (
                                <div
                                    key={product.product_id}
                                    className={`product-card ${
                                        productSelected?.product_id === product.product_id
                                            ? 'selected'
                                            : ''
                                    }`} // Clase "selected" si este producto está seleccionado
                                    onClick={() => handleProductClick(product)} // Maneja el clic en el producto
                                >
                                    <h4>{product.theme_name.name}</h4>
                                    <p>{product.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos para esta categoría.</p>
                        )}
                    </div>

                    <MaintainerForm
                        product={productSelected}
                        catSelected={catSelected}
                    ></MaintainerForm>
                </div>
                <div className="maintainer-footer"></div>
            </div>
        </section>
    )
}

export default MaintainerPage
