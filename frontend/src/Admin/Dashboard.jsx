import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Switch, Avatar, Divider, Menu, MenuItem, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImageIcon from "@mui/icons-material/Image";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Brightness4, Brightness7, Notifications, Category as CategoryIcon } from "@mui/icons-material";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Banner from "./pages/Banner";
import Logout from "./pages/Logout";
import { useCookies } from "react-cookie";
import './Dashboard.css';
import Category from "./pages/Caetgory";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon /> },
  { text: "Orders", icon: <ShoppingCartIcon /> },
  { text: "Banner", icon: <ImageIcon /> },
  { text: "Products", icon: <InventoryIcon /> },
  { text: "Users", icon: <PersonIcon /> },
  { text: "Category", icon: <CategoryIcon /> }, // ✅ Category icon added
  { text: "Settings", icon: <SettingsIcon /> },
  { text: "Logout", icon: <ExitToAppIcon /> },
];

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [comp, setComp] = useState("Dashboard");
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'token', 'role']);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    removeCookie("username");
    removeCookie("token");
    removeCookie("role");
    setAnchorEl(null);
  };

  const rendComp = () => {
    try {
      switch (comp) {
        case "Dashboard":
          return <Home />;
        case "Orders":
          return <Order />;
        case "Banner":
          return <Banner />;
        case "Products":
          return <Products />;
        case "Users":
          return <Users />;
        case "Category":
          return <Category />;
        default:
          return <Home />;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: darkMode ? "#121212" : "#fff", color: darkMode ? "#fff" : "#000" }}>
      {/* Sidebar */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={open}
        onClose={() => setOpen(false)}
        sx={{ "& .MuiDrawer-paper": { width: open ? 250 : 80, transition: "width 0.3s" } }}
      >
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Avatar sx={{ width: 60, height: 60, margin: "auto" }} />
          {open && (
            <>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" color="textSecondary">Admin</Typography>
            </>
          )}
        </Box>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} sx={{ justifyContent: open ? "flex-start" : "center" }} onClick={() => setComp(item.text)}>
              <Tooltip title={!open ? item.text : ""} placement="right">
                {item.icon}
              </Tooltip>
              {open && <ListItemText primary={item.text} sx={{ marginLeft: 1 }} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Navbar */}
      <AppBar position="fixed" sx={{ bgcolor: darkMode ? "#333" : "primary.main", width: `calc(100% - ${open ? 250 : 80}px)`, transition: "width 0.3s" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar />
          </IconButton>
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    mt: 8,
    width: `calc(100% - ${open ? 250 : 80}px)`,
    transition: "margin-left 0.3s",
    ml: `${open ? 250 : 80}px`, // Fixing margin-left
  }}
>
  {rendComp()}
</Box>

    </Box>
  );
};

export default Dashboard;
