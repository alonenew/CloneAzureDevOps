import React from 'react'
import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/images/logo-hover.png'
import minilogo from '../../assets/images/mini_logo.png'
import minilogo2 from '../../assets/images/mini_logo_hover.png'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser, selectName, selectToken } from "../../store/slices/authSlice";
import { selectOpenLogo } from '../../store/slices/toggleSlice'
import AvatarName from './AvatarName'
import { clear } from '../../store/slices/itemSlice'

function Navbar() {
    const open = useSelector(selectOpenLogo);
    const token = useSelector(selectToken);
    const name = useSelector(selectName);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser());
        dispatch(clear());
        navigate("/");
    }

    return (
        <>
            {token && <nav className='px-2 shadow flex h-12 items-center'>
                {!open ?
                    <img className='w-5 h-5 ml-1.5 mr-3' src={minilogo} alt="logo"
                        onMouseOver={e => e.currentTarget.src = minilogo2}
                        onMouseOut={e => e.currentTarget.src = minilogo}
                        onClick={() => window.location.href = `/`}
                    />
                    :
                    <img className='w-30 h-5 ml-1.5 mr-3' src={logo} alt="logo"
                        onMouseOver={e => e.currentTarget.src = logo2}
                        onMouseOut={e => e.currentTarget.src = logo}
                        onClick={() => window.location.href = `/`}
                    />
                }
                <div className=' text-sm opacity-60 '>
                    <span className='p-3'>becomedev2</span>/
                    <span className='p-3'>Miniproject</span>/
                    <span className='p-3'>Boards</span>/
                    <span className='p-3'>Boards</span>
                </div>
                <div className='mx-auto'></div>
                <Search />
                <div className='pr-4 pl-2.5 flex opacity-50'>
                    <p className='px-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" ><path fill="none" d="M0 0h24v24H0z" /><path d="M8 4h13v2H8V4zm-5-.5h3v3H3v-3zm0 7h3v3H3v-3zm0 7h3v3H3v-3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" /></svg>
                    </p>
                    <p className='px-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" ><path fill="none" d="M0 0h24v24H0z" /><path d="M7 8V6a5 5 0 1 1 10 0v2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3zm0 2H5v10h14V10h-2v2h-2v-2H9v2H7v-2zm2-2h6V6a3 3 0 0 0-6 0v2z" /></svg>
                    </p>
                    <p className='px-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" ><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z" /></svg>
                    </p>
                    <p className='px-2' >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" ><path fill="none" d="M0 0h24v24H0z" /><path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm2.595 7.812a3.51 3.51 0 0 1 0-1.623l-.992-.573 1-1.732.992.573A3.496 3.496 0 0 1 17 14.645V13.5h2v1.145c.532.158 1.012.44 1.405.812l.992-.573 1 1.732-.992.573a3.51 3.51 0 0 1 0 1.622l.992.573-1 1.732-.992-.573a3.496 3.496 0 0 1-1.405.812V22.5h-2v-1.145a3.496 3.496 0 0 1-1.405-.812l-.992.573-1-1.732.992-.572zM18 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></svg>
                    </p>
                </div>
                <div onClick={logout}>
                    {name && <AvatarName  name={name}/>}
                </div>

            </nav>}
        </>
    )
}

export default Navbar