import React, { useContext } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate } from 'react-router-dom'

const MaintainerPage: React.FC = () => {
    const userStatus = useContext(UserContext)
    const navigate = useNavigate()

    if (userStatus && userStatus.user?.role != 'admin') navigate('/')

    return (
        <section className="section maintainer-section">
            <div className="container">
                <div className="maintiner-header">
                    <h2>Configuración de Productos</h2>
                    <div className="buttons-container">
                        <button>Nuevo Producto</button>
                        <button>Nueva Categoría</button>
                        <button>Nueva Temática</button>
                    </div>
                </div>
                <div className="maintainer-body"></div>
                <div className="maintainer-footer"></div>
            </div>
        </section>
    )
}

export default MaintainerPage
