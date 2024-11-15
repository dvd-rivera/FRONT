import React, { useEffect, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

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
        'transition-all border-2 bg-fuchsia-400 hover:bg-fuchsia-500 flex p-3 rounded'

    return (
        <div>
            <button
                className={buttonCategories}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <p className="mr-4 text-white font-bold">Categorias</p>
                <MenuIcon className="text-white" />
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
        </div>
    )
}

export default CategoriesMenu
