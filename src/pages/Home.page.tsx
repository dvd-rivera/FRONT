import React from 'react'
import CardSection from '../components/home-components/card-section.component'

const HomePage: React.FC = () => {
    return (
        <section className="section">
            <h2>Productos</h2>
            <CardSection productType="Agenda" />
            <CardSection productType="Cuaderno" />
        </section>
    )
}

export default HomePage
