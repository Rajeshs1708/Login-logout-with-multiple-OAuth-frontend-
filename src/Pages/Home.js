import React,{useEffect} from 'react';
// import React from 'react';
import './Home.css';
import axios from 'axios';
import { posts } from '../data';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../Components/Card';
import Charts from '../Components/Charts';

const Home = ({ user }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const oauthUser = user
    const token = localStorage.getItem('TOKEN');
    if (!token && !oauthUser) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [navigate,user])

  const handleLogout = () => {
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/signout`)
        .then(res => {
          if (res) {
            const notify = () => toast.success(`*${res.data.message}*`, { theme: 'colored' });
            notify()
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("NAME");
            localStorage.removeItem("EMAIL");
            setTimeout(() => {
              navigate('/login')
            }, 1000)

          }
        })
        .catch(err => {
          const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
          notify()
        })


    } catch (err) {
      console.log("Error...", err);
    }
  }
  return (
    <>
      <div className='row'>
        <p className='h5 text-center'>Welcome : {localStorage.getItem('NAME')}</p>
        <button className='btn btn-info pe-4' title="This is for input logout" onClick={handleLogout}>Logout</button>
        <ToastContainer autoClose={3000} theme="colored" />
      </div>

      <div className='row text-center'>
        <h4>Most popular wonders of the world</h4>
        <Charts />
      </div>

      <div className='home row'>
        <p className='text-center display-6 topic'>7 Wonders of the world</p>
        {
          posts.map(post => (
            <Card key={post.id} post={post} />
          ))
        }
      </div>

    </>
  )
}

export default Home
