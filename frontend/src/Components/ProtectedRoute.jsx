import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({allowedRoles}) => {

    const [cookie] = useCookies(["token", "role"]);

    const token = cookie.token || ''
    const allowedrole = cookie.role || ''
  
    if(!token){
        return <Navigate to="/" replace={true} />
    }
    if(!allowedrole.includes(allowedRoles)){
        return <Navigate to="/" replace={true} />
    }



   return <Outlet />
}

export default ProtectedRoute;