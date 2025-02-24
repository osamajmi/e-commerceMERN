import logo from './logo.svg';
import './App.css';
import Navbar from './Components/navBar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/home';
import Products from './pages/products';
import { ToastContainer } from "react-toastify";
import LoginPage from './pages/Login';
import Register from './pages/Register';
import Dashboard from './Admin/Dashboard';

import ProtectedRoute from './Components/ProtectedRoute';
import { useCookies } from 'react-cookie';

function App() {
  
  const [cookie] = useCookies(["token", "role"]);
  const isAdmin = cookie.role === "Admin";

  return (
    <div className="App">
      {isAdmin ? null : <Navbar />}
     
       <ToastContainer position="top-right" autoClose={2500} />
      

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Register" element={<Register/>} />

            {/* protected Routes  */}

           <Route element={<ProtectedRoute allowedRoles={["Admin"]}/>}>
               <Route path="/admin" element={<Dashboard />} />
           </Route>

          </Routes>
      
    </div>
  );
}

export default App;
