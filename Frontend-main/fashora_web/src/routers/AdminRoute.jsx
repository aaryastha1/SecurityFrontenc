import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/authProvider";

import React, { useContext } from 'react'
import MainLayout from "../layouts/MainLayout";

export default function AdminRoute() {
    const { user, loading } = useContext(AuthContext)

  if (loading) return <>Loading</>
  
      if (!user) return <Navigate to = "\login" replace/>
      // replace will note save history
  
      if (user.role !=="admin" )return <Navigate to = "/" replace/>
    return <Outlet/>
     
}