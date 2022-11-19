import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { reLoginAsync, selectToken, name } from "../../store/slices/authSlice";

export default function ProtectRoute() {
  const auth = useSelector(selectToken);
  const dispatch = useDispatch();
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (auth) {
      dispatch(reLoginAsync(id))
        .unwrap()
        .then(res => {
          dispatch(name(res));
        })
    }// eslint-disable-next-line
  }, []);


  const PrivateRoutes = () => {
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }

  return { PrivateRoutes }
};



