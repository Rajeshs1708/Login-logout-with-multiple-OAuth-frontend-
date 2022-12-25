import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ user }) {

    const logout = () => {
        window.open(`${process.env.REACT_APP_BASE_URL}/auth/logout`, "_self")
    }

    return (
        <div className='navbar d-flex align-items-center justify-content-around text-white'>
            <span className='logo'>
                <span style={{ fontSize: "40px" }} className="material-symbols-outlined pe-3 d-flex justify-content-center">home_app_logo</span>
                Login/OAuth
            </span>
            {
                user ? (
                    <ul className='list d-flex align-items-center list-unstyled'>
                        <li className='listItem  text-center pe-2'>
                            <span className="material-symbols-outlined">person</span>
                        </li>
                        <li className='listItem text-center pe-4'>{user.name}</li>
                        <li className='listItem  text-center pe-2'>
                            <span className="material-symbols-outlined">logout</span>
                        </li>
                        <li className='listItem text-center pe-4' title="This is for OAuth" onClick={logout}>Logout</li>
                    </ul>
                ) : (
                    <>
                        <Link className='link h5' to='/'>Login</Link>
                    </>
                )
            }

        </div>
    )
}

export default Navbar
