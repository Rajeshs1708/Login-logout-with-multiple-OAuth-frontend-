import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import {
  BoxArrowInLeft,
  PersonCircle,
  SearchHeart
} from 'react-bootstrap-icons'

function Navbar ({ user }) {
  let user2 = localStorage.getItem('NAME')

  const logout = () => {
    {
      user
        ? window.open(`${process.env.REACT_APP_BASE_URL}/auth/logout`, '_self')
        : function handleLogout () {
            try {
              axios
                .get(`${process.env.REACT_APP_BASE_URL}/api/signout`)
                .then(res => {
                  if (res) {
                    const notify = () =>
                      toast.success(`*${res.data.message}*`, {
                        theme: 'colored'
                      })
                    notify()
                    localStorage.removeItem('TOKEN')
                    localStorage.removeItem('NAME')
                    localStorage.removeItem('EMAIL')
                    setTimeout(() => {
                      navigate('/login')
                    }, 1000)
                  }
                })
                .catch(err => {
                  const notify = () =>
                    toast.error(`*${err.response.data.message}*`, {
                      theme: 'colored'
                    })
                  notify()
                })
            } catch (err) {
              console.log('Error...', err)
            }
          }
      handleLogout()
    }
  }

  return (
    <div className='navbar d-flex align-items-center justify-content-around text-white'>
      <span className='logo'>
        Find Articles <SearchHeart className='searchIcon' />
      </span>
      {user || user2 ? (
        <ul className='list d-flex align-items-center list-unstyled'>
          <li className='listItem text-center pe-4'>
            <PersonCircle className='bootIcon' />
            {user2.name}
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
          <Link className='link h5' to='/login'>
            Login
          </Link>
        </>
      )}
    </div>
  )
}

export default Navbar
