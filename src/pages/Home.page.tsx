import React from 'react'
import CardSection from '../components/home-components/card-section.component'
import HeroSection from '../components/home-components/hero-section.component'

const HomePage: React.FC = () => {
    return (
        <section className="section flex flex-col mt-24 home-section">
            <HeroSection />
            <h2 className="home-subtitle">Productos Destacados</h2>
            <CardSection productType="Agenda" limit="4" isRandom />
            <CardSection productType="Cuaderno" limit="4" />
        </section>
    )
}

export default HomePage
