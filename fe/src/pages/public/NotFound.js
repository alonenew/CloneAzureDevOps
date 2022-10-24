import React from 'react'
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const redirect = () => {
        navigate("/");
    }
  return (
    <div className='w-screen h-screen bg-404 absolute top-0 bg-white bg-no-repeat bg-contain bg-center' onClick={redirect}> 
    </div>
  )
}

export default NotFound