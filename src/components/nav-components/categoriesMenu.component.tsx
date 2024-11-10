import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const CategoriesMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Categoría 1', onClick: () => console.log('Categoría 1') },
    { label: 'Categoría 2', onClick: () => console.log('Categoría 2') },
    { label: 'Categoría 3', onClick: () => console.log('Categoría 3') },
    { label: 'Categoría 4', onClick: () => console.log('Categoría 4') },
    { label: 'Categoría 5', onClick: () => console.log('Categoría 5') },
  ];

  const buttonCategories = 'transition-all border-2 bg-fuchsia-400 hover:bg-fuchsia-500 flex p-3 rounded';

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
        <p className='mr-4 text-white font-bold'>Categorias</p>
        <MenuIcon className='text-white'></MenuIcon>
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
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => { handleClose(); item.onClick() }}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>

    </div>
  );
};

export default CategoriesMenu;