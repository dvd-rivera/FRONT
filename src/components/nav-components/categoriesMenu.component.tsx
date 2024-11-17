import React, { useEffect, useState } from 'react'
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Category {
    id: string
    name: string
    dbName: string
}

const CategoriesMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const open = Boolean(anchorEl)
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const loadCategories = async () => {
        try {
            const response = await fetch('src/assets/categorias.json')
            const data = await response.json()
            setCategories(data.categorias)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const buttonCategories =
        'transition-all hidden lg:flex p-3 rounded'

    return (
        <div >
            <button
                className={buttonCategories}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <p className="mr-4 font-bold">Categorias</p>
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
                {categories.map((item) => (
                    <MenuItem
                        key={item.id}
                        onClick={() => {
                            handleClose()
                            navigate(`/category/${item.dbName}`)
                        }}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
            <div className="block lg:hidden ">

                <Accordion elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='shadow-none'
                    >
                        <Typography>Categorías</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {categories.map((item) => (
                            <MenuItem
                                key={item.id}
                                onClick={() => {
                                    handleClose()
                                    navigate(`/category/${item.dbName}`)
                                }}
                            >
                                {item.name}
                            </MenuItem>
                        ))}
                    </AccordionDetails>
                </Accordion>

            </div>
        </div>
    )
}

export default CategoriesMenu
