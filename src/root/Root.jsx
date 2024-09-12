import { useState } from 'react';
import { Box, Grid, Drawer, IconButton, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Outlet } from 'react-router-dom';
import { FaPlus, FaCogs, } from 'react-icons/fa';
import { styled } from '@mui/material/styles';

const Root = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    const list = (
        <List className="space-y-2">
            <div className="flex  justify-center flex-col bg-[#ffffff9f] rounded-lg p-4 items-center border-2 shadow-lg">
          <div className='z-20'>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ width: 100, height: 100 }} alt="Faysal Sarker" src="/static/images/avatar/1.jpg" />
                    </StyledBadge>
    
                    <div>
                        <Typography className="font-semibold text-gray-700" variant="h6">
                            Faysal Sarker
                        </Typography>
                    </div>
          </div>
            </div>

            <hr />

            <ListItem
                button
                component={NavLink}
                to="/add-post"
                className={({ isActive }) =>
                    isActive
                        ? 'bg-gray-500 text-white shadow-[0px_0px_15px_3px_rgba(98,0,238,0.7)] font-bold rounded-lg transition duration-300'
                        : 'text-gray-700 hover:bg-gray-500 hover:text-white hover:shadow-lg rounded-lg transition duration-300'
                }
            >
                <ListItemIcon className="text-inherit">
                    <FaPlus />
                </ListItemIcon>
                <ListItemText primary="Add Post" />
            </ListItem>


            <div className=''>
    <NavLink
        to='/'
        className={({ isActive }) =>
            isActive
                ? 'bg-gray-500 text-white shadow-[0px_0px_15px_3px_rgba(98,0,238,0.7)] font-bold rounded-lg transition duration-300 flex gap-2'
                : 'text-gray-700 hover:bg-gray-500 hover:text-white hover:shadow-lg rounded-lg transition duration-300 flex gap-2  items-center'
        }
    >
        <NavLink
            className={({ isActive }) =>
                isActive
                    ? 'p-2 border-2 rounded-lg bg-secondary'
                    : 'p-2 border-2 rounded-lg bg-transparent'
            }
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
           </svg>
        </NavLink>
        sdoijfeioiof
    </NavLink>
</div>



            <ListItem
                button
                component={NavLink}
                to="/control"
                className={({ isActive }) =>
                    isActive
                        ? 'bg-gray-500 text-white shadow-[0px_0px_15px_3px_rgba(98,0,238,0.7)] font-bold rounded-lg transition duration-300'
                        : 'text-gray-700 hover:bg-gray-500 hover:text-white hover:shadow-lg rounded-lg transition duration-300'
                }
            >
                <ListItemIcon className="text-inherit">
                    <FaCogs />
                </ListItemIcon>
                <ListItemText primary="Control" />
            </ListItem>
        </List>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Top AppBar with logo and menu button - only visible on mobile and tablet */}
            <div className="lg:hidden shadow-md z-40">
                <AppBar
                    sx={{
                        backdropFilter: 'blur(10px)', // Adds the blur effect
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
                    }}
                >
                    <Toolbar className="flex justify-between px-4">
                        <Typography variant="h6" component="div" className="text-black font-bold">
                            Your Logo
                        </Typography>
                        <IconButton
                            edge="start"
                            color="black"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            className="text-black"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>

            {/* Drawer for sidebar on smaller devices */}
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                className="lg:hidden"
            >
                <Box
                    sx={{ width: 250, padding: 2 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    className="bg-white h-full"
                >
                    <nav>
                        {list}
                    </nav>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1, width: '100%', height: '100vh', marginTop: { xs: 8, lg: 0 } }}>
                <Grid container className="h-full">
                    {/* Sidebar for large devices */}
                    <Grid
                        item
                        lg={3}
                        className="border-r p-4 bg-white hidden lg:block"
                    >
                        <nav>
                            {list}
                        </nav>
                    </Grid>

                    {/* Main content area */}
                    <Grid
                        item
                        xs={12}
                        lg={9}
                        className="p-4"
                    >
                        <div className="bg-white h-full shadow-md p-6 rounded-md">
                            <h1 className="text-2xl font-semibold text-gray-800">Main Content Area</h1>
                            <Outlet />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Root;
