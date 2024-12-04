import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'; // Importa el hook useParams
import { ProductContext } from '../context/products.context';
import CardSection from '../components/home-components/card-section.component';
// import { CartContext } from '../context/cart.context';

const CategoriesPage: React.FC = () => {
  const productContext = useContext(ProductContext);
  const pageParams = useParams<{ id: string }>(); // Especifica que esperas un parámetro `id` como string
  // const cartContext = useContext(CartContext);

  console.log(productContext?.products);

  // Verifica si `id` está definido antes de usarlo
  const formattedCategory =
    pageParams.id
      ? pageParams.id.charAt(0).toUpperCase() + pageParams.id.slice(1)
      : 'Categoría no encontrada';

  return (
    <section className="section flex flex-col">
      <h2 className="home-subtitle my-4 bg-white py-4 px-6 rounded-lg font-extrabold text-pink-400 text-xl">
        {formattedCategory}
      </h2>
      <CardSection limit="5" />
    </section>
  );
};

export default CategoriesPage;
