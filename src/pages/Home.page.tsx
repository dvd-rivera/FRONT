import React from 'react'
import CardSection from '../components/home-components/card-section.component'

const HomePage: React.FC = () => {
    return (
        <section className="section flex flex-col mt-24">
            <h2>Productos Destacados</h2>
            <CardSection productType="Agendas" />
            <CardSection productType="Cuadernos" />
            
        </section>
    )
}

export default HomePage
