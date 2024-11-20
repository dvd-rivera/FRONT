import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

const FooterComponent: React.FC = () => {
    return (
        <footer>
            <div className="container">
                <div className="contact-section">
                    <h3 className="footer-title">Contáctanos</h3>
                    <p>¿Necesitas ponerte en contacto con nosotros?</p>
                    <p className="mail">contacto@happyart.cl</p>
                    <div className="social-container">
                        <InstagramIcon style={{ fontSize: 40, color: '#FF8DC0' }}></InstagramIcon>
                        <WhatsAppIcon style={{ fontSize: 40, color: '#FF8DC0' }}></WhatsAppIcon>
                    </div>
                </div>
                <div className="contact-section">
                    <h3 className="footer-title">Ayuda</h3>
                    <p>Preguntas Frecuentes</p>
                    <p>Información de Despachos</p>
                    <p>Formas de Pago</p>
                    <p>Cambios y Devoluciones</p>
                </div>
                <div className="contact-section">
                    <h3 className="footer-title">Sobre Nosotros</h3>
                    <p>Quienes Somos</p>
                    <p>Regalos Corporativos</p>
                    <p>Distribución y venta mayorista</p>
                </div>
                <div className="brand-container">
                    <img src="/img/happyArt-v.svg" alt="" />
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent
