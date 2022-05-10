import React, { useEffect, useState } from "react";
import api from "./api";
import { logout, getToken } from "./auth";
import { Route, Navigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';


export default function WAuth({ component: Component, ...rest }) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function verify() {
      var res = await api.get('/api/usuarios/checktoken', {
        params: { token: getToken() }
      });
      if (res.data.status === 200) {
        setLoading(false);
        setRedirect(false);
      } else {
        logout();
        setLoading(false);
        setRedirect(true);
      }
    }
    setTimeout(()=>verify(),2000);
    //verify();
  }, []);

  return (
    loading ? 
    <LinearProgress />
   : 
    <Route
      {...rest}
      render={props =>
        !redirect ? (
          <Component {...props} />
        ) : 
          <Navigate
            to={{ pathname: "/admin/login", state: { from: props.location } }}
          />
        
      }
    />
  );
}