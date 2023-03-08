import React,{useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import {
  BoxArrowInLeft,
  PersonCircle,
  SearchHeart
} from 'react-bootstrap-icons'

function Navbar ({ user }) {
  const [name, setName] = useState(null)
  const [token, setToken] = useState(null)
  const logout = () => {
    window.open(`${process.env.REACT_APP_BASE_URL}/auth/logout`, '_self')
  }

  useEffect(() => { 
    function getUser() {
      let token = localStorage.getItem('TOKEN')
      let name = localStorage.getItem('NAME')
      setName(name)
      setToken(token)
    }
    getUser()
  }, [])

  return (
    <div className='navbar d-flex align-items-center justify-content-around text-white'>
      <span className='logo'>
        Find Articles <SearchHeart className='searchIcon' />
      </span>
      {user ? (
        <ul className='list d-flex align-items-center list-unstyled'>
          <li className='listItem text-center pe-4'>
            <PersonCircle className='bootIcon' />
            {user.name}
          </li>
          <li
            className='listItem text-center pe-4'
            title='This is for OAuth'
            onClick={logout}
          >
            <BoxArrowInLeft className='bootIcon' /> Logout
          </li>
        </ul>
      ) : (
        <>
          {token ? (
            <><li>{name}</li></>
          ) : (
            <Link className='link h5' to='/login'>
              Login
            </Link>
          )}
        </>
      )}
    </div>
  )
}

export default Navbar
