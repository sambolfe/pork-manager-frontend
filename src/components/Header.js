import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Collapse, Popover } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Dropdown from './Dropdown';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileOpenDropdown, setMobileOpenDropdown] = useState({
        alojamentos: false,
        suinos: false,
        racas: false,
        saude: false
    });

    const toggleDrawer = (open) => (event) => {
        setIsDrawerOpen(open);
    };

    const handleClick = (event, key) => {
        setAnchorEl(event.currentTarget);
        setOpenDropdown(key);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenDropdown(null);
    };

    const open = Boolean(anchorEl);

    const toggleMobileDropdown = (key) => {
        setMobileOpenDropdown(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    return (
        <header className="flex border-b bg-white font-sans min-h-[70px] tracking-wide relative z-50">
            <div className="flex flex-wrap items-center justify-between px-10 py-3 gap-4 w-full">
                <a href="/">
                    <img src="/logo.png" alt="logo" className="w-20" />
                </a>

                <div className='hidden lg:flex lg:items-center lg:space-x-6'>
                    <a href="/" className="text-[15px] font-bold text-blue-600">Home</a>
                    <ListItem button onClick={(event) => handleClick(event, 'alojamentos')}>
                        <ListItemText primary="Alojamentos" />
                        {openDropdown === 'alojamentos' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Popover
                        open={open && openDropdown === 'alojamentos'}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText primary="Listar Alojamentos" />
                            </ListItem>
                        </List>
                    </Popover>

                    <ListItem button onClick={(event) => handleClick(event, 'suinos')}>
                        <ListItemText primary="Suínos" />
                        {openDropdown === 'suinos' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Popover
                        open={open && openDropdown === 'suinos'}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText primary="Listar Suínos" />
                            </ListItem>
                        </List>
                    </Popover>

                    <ListItem button onClick={(event) => handleClick(event, 'racas')}>
                        <ListItemText primary="Raças" />
                        {openDropdown === 'racas' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Popover
                        open={open && openDropdown === 'racas'}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText primary="Listar Raças" />
                            </ListItem>
                        </List>
                    </Popover>

                    <ListItem button onClick={(event) => handleClick(event, 'saude')}>
                        <ListItemText primary="Saúde" />
                        {openDropdown === 'saude' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Popover
                        open={open && openDropdown === 'saude'}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText primary="Listar Saúde" />
                            </ListItem>
                        </List>
                    </Popover>
                </div>

                <div className="flex items-center space-x-8 max-lg:ml-auto">
                    <div className='flex items-center max-sm:ml-auto space-x-6'>
                        <button onClick={toggleDrawer(true)} className="lg:hidden ml-7">
                            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button onClick={() => toggleMobileDropdown('alojamentos')}>
                        <ListItemText primary="Alojamentos" />
                        {mobileOpenDropdown.alojamentos ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={mobileOpenDropdown.alojamentos} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText primary="Listar Alojamentos" />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem button onClick={() => toggleMobileDropdown('suinos')}>
                        <ListItemText primary="Suínos" />
                        {mobileOpenDropdown.suinos ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={mobileOpenDropdown.suinos} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText primary="Listar Suínos" />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem button onClick={() => toggleMobileDropdown('racas')}>
                        <ListItemText primary="Raças" />
                        {mobileOpenDropdown.racas ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={mobileOpenDropdown.racas} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText primary="Listar Raças" />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem button onClick={() => toggleMobileDropdown('saude')}>
                        <ListItemText primary="Saúde" />
                        {mobileOpenDropdown.saude ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={mobileOpenDropdown.saude} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText primary="Listar Saúde" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Dropdown />
        </header>
    );
};

export default Header;
