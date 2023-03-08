import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { BoxArrowLeft, Person, SearchHeart } from 'react-bootstrap-icons'

function Navbar ({ user }) {
  let user2 = {
    name: localStorage.getItem('NAME'),
    email: localStorage.getItem('NAME'),
    token: localStorage.getItem('NAME')
  }
  const logout = () => {
    window.open(`${process.env.REACT_APP_BASE_URL}/auth/logout`, '_self')
  }

  return (
    <div className='navbar d-flex align-items-center justify-content-around text-white'>
      <span className='logo'>
        Find Articles <SearchHeart className='searchIcon' />
      </span>
      {user || user2 ? (
        <ul className='list d-flex align-items-center list-unstyled'>
          {/* <li className='listItem text-center pe-4'>
            <Person />
            {user.name}
          </li> */}
          <li
            className='listItem text-center pe-4'
            title='This is for OAuth'
            onClick={logout}
          >
            <BoxArrowLeft />
            Logout
          </li>
        </ul>
      ) : (
        <>
          <Link className='link h5' to='/login'>
            Login
          </Link>
        </>
      )}
    </div>
  )
}

export default Navbar
