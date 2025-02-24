import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile Icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Cart Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Wishlist Icon
import HomeIcon from "@mui/icons-material/Home"; // Home Icon
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";
import "./navbar.css";
import HeaderMenu from "./subNavbar";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bottomNav, setBottomNav] = useState(0);

  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Cart", path: "/cart" },
    { label: "Login", path: "/login" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img
        src="/images/logo.png"
        alt="E-Commerce Logo"
        style={{ width: "120px", margin: "10px auto" }}
      />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.path}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Main Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: "#333" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ width: "120px", display: "flex", alignItems: "center" }}>
            <img
              src="/images/logo.png"
              alt="E-Commerce Logo"
              style={{ height: "40px" }}
            />
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchBar />
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: "flex", gap: 2, ml: 2 }}>
            <IconButton color="inherit" component={Link} to="/wishlist">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/profile">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

     
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          // justifyContent: "end",
          backgroundColor: "#f8f8f8",
          padding: "10px 0",
          position: "fixed",
          top: "80px",
          // zIndex: 1, 
        }}
      >
         <HeaderMenu />
        {navItems.map((item) => (
          <Button
            key={item.label}
            component={Link}
            to={item.path}
            sx={{ mx: 2, color: "#333", fontWeight: "bold" }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        
        <HeaderMenu />
        {drawer}
      </Drawer>

      {/* 📱 Bottom Navigation (Only for Mobile View) */}
      <Box sx={{ display: { xs: "block", sm: "none" }, position: "fixed", bottom: 0, width: "100%", backgroundColor: "#fff", boxShadow: "0px -2px 5px rgba(0,0,0,0.1)" }}>
      <HeaderMenu />
        <BottomNavigation
          value={bottomNav}
          onChange={(event, newValue) => {
            setBottomNav(newValue);
          }}
          showLabels
        >

          <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
          <BottomNavigationAction label="Wishlist" icon={<FavoriteBorderIcon />} component={Link} to="/wishlist" />
          <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} component={Link} to="/cart" />
          <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} component={Link} to="/profile" />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default Navbar;
