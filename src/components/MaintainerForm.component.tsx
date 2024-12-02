import React, { useState, useEffect, useContext } from 'react'
import { ProductDefault } from '../models/productos.interface'
import { MaintainerContext } from '../context/maintainer.contex'

interface ProductEditorProps {
    product: ProductDefault | null
    catSelected: string | null
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, catSelected }) => {
    const [editedProduct, setEditedProduct] = useState<ProductDefault | null>(product)
    const maintainerContext = useContext(MaintainerContext)
    // Actualiza `editedProduct` cada vez que `product` cambie
    useEffect(() => {
        setEditedProduct(product)
        console.log(catSelected)
    }, [product])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedProduct((prev) => ({
            ...prev!,
            [name]: value,
        }))
    }

    const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>, attribute: string) => {
        const { value } = e.target
        setEditedProduct((prev) => ({
            ...prev!,
            other_attributes: {
                ...prev!.other_attributes,
                [attribute]: value,
            },
        }))
    }

    const attributeFieldsMap: Record<string, string[]> = {
        Agenda: ['sheets', 'size', 'sheet_type', 'laminate'],
        Cuaderno: ['sheets', 'size', 'sheet_type', 'laminate', 'gr'],
        Drawing_Notebook: ['sheets', 'tamaño', 'laminate'],
        Keychain_Sticky_Notes: ['elastic_color'],
        Bookmarks_Set: ['laminate'],
        Stickers_Set: ['size'],
        Wall_Calendar: ['size'],
        Magnet_Calendar: ['size'],
        Magnetic_Fridge: ['size'],
        Painting: ['size'],
        Resined_painting: ['size'],
        Happy_Box: ['content'],
    }

    const onSave = (editedProduct: ProductDefault) => {
        console.log('Producto Editado:', editedProduct)
        maintainerContext?.updateProduct(editedProduct)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editedProduct) {
            onSave(editedProduct)
        }
    }

    const renderDynamicFields = () => {
        if (!catSelected) {
            return <p className="text-gray-500">No hay un tipo de categoría seleccionada.</p>
        }

        // Obtener los campos correspondientes al tipo seleccionado
        const fieldsToRender = attributeFieldsMap[catSelected] || []

        if (!fieldsToRender.length) {
            return <p className="text-gray-500">No hay campos específicos para esta categoría.</p>
        }

        return fieldsToRender.map((key) => (
            <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{key}:</label>
                <input
                    type={
                        typeof editedProduct?.other_attributes[
                            key as keyof (typeof editedProduct)['other_attributes']
                        ] === 'number'
                            ? 'number'
                            : 'text'
                    }
                    name={key}
                    value={
                        (
                            editedProduct?.other_attributes[
                                key as keyof (typeof editedProduct)['other_attributes']
                            ] as string | number | undefined
                        )?.toString() || ''
                    }
                    onChange={(e) => handleAttributeChange(e, key)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        ))
    }

    if (!product) {
        return <p className="not-product">No hay un producto seleccionado.</p>
    }

    return (
        <div className="config-container">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <div className="images-container">
                <div className="img-container">
                    <img src={product.img} alt="Producto" />
                </div>
                <div className="add-img">+</div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        value={editedProduct?.description || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio:</label>
                    <input
                        type="number"
                        name="price"
                        value={editedProduct?.price || 0}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={editedProduct?.stock || 0}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Campos dinámicos según el tipo de producto */}
                <h3 className="text-lg font-semibold mt-6">Atributos Específicos</h3>
                {renderDynamicFields()}

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
