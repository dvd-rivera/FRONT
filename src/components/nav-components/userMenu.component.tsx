import React, { useContext, useState } from 'react'
import {
    Menu,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user.context'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const UserMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const userStatus = useContext(UserContext)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const buttonUserMenu =
        'transition-all hidden lg:flex p-3 rounded  hover:text-zinc-950'

    if (!userStatus) {
        return (
            <div className="login-container mx-4 transition  hover:text-zinc-950 px-4 rounded-md my-1 lg:my-0 lg:w-auto w-full lg:text-left text-center py-3 order-1 lg:order-last">
                <Link to="/login">Inicia sesión</Link>
            </div>
        )
    }

    const isAdmin = userStatus.user?.role === 'admin'

    return (
        <div>
            {userStatus.isAuthenticated ? (
                <>
                    {/* Botón de usuario para pantallas grandes */}
                    <button
                        className={buttonUserMenu}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <p className="mr-4 font-bold">Hola! {userStatus.user?.firstName}</p>
                        <KeyboardArrowDownIcon />
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{
                            width: { xs: '100%', sm: 'auto' }, // Ancho total en pantallas pequeñas
                            maxWidth: '100vw', // Asegura que no se desborde
                            left: 0,
                            right: 0,
                        }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {isAdmin && (
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    navigate(`/maintainer`)
                                }}
                            >
                                Configurar Tienda
                            </MenuItem>
                        )}
                        <MenuItem
                            onClick={() => {
                                handleClose()
                                navigate(`/profile`)
                            }}
                        >
                            Mis Datos
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleClose()
                                navigate(`/`)
                                userStatus.logout()
                            }}
                        >
                            Cerrar Sesión
                        </MenuItem>
                    </Menu>

                    {/* Acordeón para pantallas pequeñas */}
                    <div className="block lg:hidden">
                        <Accordion elevation={0} className="w-full">
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDownIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                className="shadow-none"
                            >
                                <Typography>Hola! {userStatus.user?.firstName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="w-full">
                                {isAdmin && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose()
                                            navigate(`/maintainer`)
                                        }}
                                    >
                                        Configurar Tienda
                                    </MenuItem>
                                )}
                                <MenuItem
                                    onClick={() => {
                                        handleClose()
                                        navigate(`/category/mi-perfil`)
                                    }}
                                >
                                    Mis Datos
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClose()
                                        navigate(`/`)
                                        userStatus.logout()
                                    }}
                                >
                                    Cerrar Sesión
                                </MenuItem>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </>
            ) : (
                <div className="login-container mx-4 transition hover:text-zinc-950 px-4 rounded-md my-1 lg:my-0 lg:w-auto w-full lg:text-left text-center py-3 order-1 lg:order-last">
                    <Link to="/login">Inicia sesión</Link>
                </div>
            )}
        </div>
    )
}

export default UserMenu
