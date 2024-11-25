import React from 'react'
import CardSection from '../components/home-components/card-section.component'
import HeroSection from '../components/home-components/hero-section.component'

const HomePage: React.FC = () => {
    return (
        <section className="section flex flex-col mt-24">
            <HeroSection />
            <h2>Productos Destacados</h2>
            <CardSection productType="Agenda" />
            <CardSection productType="Cuaderno" />
        </section>
    )
}

export default HomePage
