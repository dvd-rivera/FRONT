import React, { useState } from 'react'
import { ProductDefault } from '../models/productos.interface'

interface ProductEditorProps {
    product: ProductDefault | null
    onSave: (updatedProduct: ProductDefault) => void
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave }) => {
    if (!product) {
        return <p className="text-gray-500">No hay un producto seleccionado.</p>
    }

    const [editedProduct, setEditedProduct] = useState<ProductDefault>(product)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedProduct((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(editedProduct)
    }

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio:</label>
                    <input
                        type="number"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={editedProduct.stock}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    )
}

export default ProductEditor
