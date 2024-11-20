import React, { useContext, useState } from 'react'
import {
    Menu,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CategoriesContext } from '../../context/categories.context'
import { Category } from '../../models/productos.interface'

const CategoriesMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const categories = useContext(CategoriesContext)?.categories || []

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const buttonCategories = 'transition-all hidden lg:flex p-3 rounded'

    return (
        <div>
            {/* Botón para menú en pantallas grandes */}
            <button
                className={buttonCategories}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <p className="mr-4 font-bold">Categorías</p>
                <MenuIcon />
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* Verificación de categorías */}
                {categories.length > 0 ? (
                    categories.map((item: Category) => (
                        <MenuItem
                            key={item.id}
                            onClick={() => {
                                handleClose()
                                navigate(`/category/${item.name}`)
                            }}
                        >
                            {item.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No hay categorías disponibles</MenuItem>
                )}
            </Menu>

            {/* Acordeón para menú en pantallas pequeñas */}
            <div className="block lg:hidden">
                <Accordion elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className="shadow-none"
                    >
                        <Typography>Categorías</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {categories.length > 0 ? (
                            categories.map((item: Category) => (
                                <MenuItem
                                    key={item.id}
                                    onClick={() => {
                                        handleClose()
                                        navigate(`/category/${item.name}`)
                                    }}
                                >
                                    {item.name}
                                </MenuItem>
                            ))
                        ) : (
                            <Typography>No hay categorías disponibles</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default CategoriesMenu
