import { useState } from 'react';
import { Box, Grid, Drawer, IconButton, AppBar, Toolbar, Typography, List,  Avatar, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink, Outlet } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import useAuth from './../hook/useAuth';
import {  } from "./../css/style.css";
const Root = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {user, logout}=useAuth()

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
        <List className="space-y-4 px-4">
          <>
            {/* Avatar Section */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-xl rounded-lg p-6 shadow-xl border border-white/20">
              <div className="relative">
                {/* Avatar with Badge */}
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar
                    sx={{ width: 120, height: 120 }}
                    alt="Faysal Sarker"
                    src={`http://localhost:5000/images/${user?.profile}`}
                    className="border-4 border-white shadow-lg"
                  />
                </StyledBadge>
      
                {/* Edit Icon */}
                <Link to="/profile">
                  <div className="absolute top-1 right-1 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-100 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
      
              {/* Text Information */}
              <div className="text-center mt-4">
                <Typography className="text-white font-semibold" variant="small">
                  Role: {user?.role}
                </Typography>
                <Typography className="text-white font-bold text-lg" variant="h6">
                  Name:  {user?.name}
                </Typography>
              </div>
            </div>
          </>
      
          {/* Divider */}
          <hr className="border-black my-6" />
      
          {/* Navigation Links */}
          <div className="space-y-4">
            {/* Overview */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg p-4 transition duration-300 flex items-center shadow-xl'
                  : 'text-gray-700 hover:bg-gradient-to-r from-gray-300 to-gray-500 hover:text-white rounded-lg p-4 transition duration-300 flex items-center'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              Overview
            </NavLink>
      
            {/* All Posts */}
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold rounded-lg p-4 transition duration-300 flex items-center shadow-xl'
                  : 'text-gray-700 hover:bg-gradient-to-r from-gray-300 to-gray-500 hover:text-white rounded-lg p-4 transition duration-300 flex items-center'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              All Posts
            </NavLink>
      
            {/* Editor Management */}
            <NavLink
              to="/editor-manage"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg p-4 transition duration-300 flex items-center shadow-xl'
                  : 'text-gray-700 hover:bg-gradient-to-r from-gray-300 to-gray-500 hover:text-white rounded-lg p-4 transition duration-300 flex items-center'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25h13.5v13.5H5.25z" />
              </svg>
              Editor Management
            </NavLink>
      
            {/* User Management */}
            <NavLink
              to="/user-manage"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold rounded-lg p-4 transition duration-300 flex items-center shadow-xl'
                  : 'text-gray-700 hover:bg-gradient-to-r from-gray-300 to-gray-500 hover:text-white rounded-lg p-4 transition duration-300 flex items-center'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM5.121 17.121a8.004 8.004 0 0 1 13.758 0M21 21H3"
                />
              </svg>
              User Management
            </NavLink>
      
            {/* Post Management */}
            <NavLink
              to="/post-manage"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-lg p-4 transition duration-300 flex items-center shadow-xl'
                  : 'text-gray-700 hover:bg-gradient-to-r from-gray-300 to-gray-500 hover:text-white rounded-lg p-4 transition duration-300 flex items-center'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-3 3v-6m12-3v15c0 1.5-1.5 3-3 3H6c-1.5 0-3-1.5-3-3V6c0-1.5 1.5-3 3-3h15c1.5 0 3 1.5 3 3z"
                />
              </svg>
              Post Management
            </NavLink>
            <div
             onClick={logout}
          className='text-white bg-red-500 hover:bg-gradient-to-r from-gray-300 to-gray-500 hover:text-white rounded-lg p-4 transition duration-300 flex items-center'
            >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>

              Logout
            </div>
          </div>
      
          <hr className="border-white/20 my-6" />
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
                           
                            <Outlet />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Root;
