import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Google from '../Img/Google.png';
import Facebook from '../Img/Facebook.png';
import Github from '../Img/Github.png';

const Signup = () => {

    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const google = () => {
        window.open(`${process.env.REACT_APP_BASE_URL}/auth/google`, "_self")
    }
    const github = () => {
        window.open(`${process.env.REACT_APP_BASE_URL}/auth/github`, "_self")
    }
    const facebook = () => {
        window.open(`${process.env.REACT_APP_BASE_URL}/auth/facebook`, "_self")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (name && email && password) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/signup`, { name: name, email: email, password: password })
                    .then(res => {
                        if (res) {
                            const notify = () => toast.success(`*${res.data.message}*`, { theme: 'colored' });
                            notify()
                            setTimeout(() => {
                                navigate('/login')
                            }, 2000)
                        }
                    })
                    .catch(err => {
                        const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
                        notify()
                        setName('')
                        setEmail('')
                        setPassword('')
                    })
            } else {
                const notify = () => toast.error("Invalid input", { theme: 'colored' });
                notify()
            }
        } catch (err) {
            const notify = () => toast.error(" Input Error", { theme: 'colored' });
            notify()
            console.log("Error...", err);
        }
    }

    return (
        <>
            <h1 className='loginTitle text-center'>Choose your Login Method</h1>
            <div className='login container-fluid'>
                <div className='wrapper row'>
                    <div className='left col-sm-5'>
                        <div className='loginButton google' onClick={google}>
                            <img className='icon' src={Google} alt='Google' />
                            Google
                        </div>
                        <div className='loginButton github' onClick={github}>
                            <img className='icon' src={Github} alt='Github' />
                            Github
                        </div>
                        <div className='loginButton facebook' onClick={facebook}>
                            <img className='icon' src={Facebook} alt='Facebook' />
                            Facebook
                        </div>
                    </div>

                    <div className='center col-sm-2'>
                        <div className='line' />
                        <div className='or'>OR</div>
                    </div>

                    <div className='right col-sm-5'>
                        <form onSubmit={handleSubmit}>
                            <input className='mb-3' value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Username' required /><br />
                            <input className='mb-3' value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' required /><br />
                            <input className='mb-3' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' required />
                            <button className='submit pink darken-4 white-text btn'>Signup</button>
                            <ToastContainer hideProgressBar={true} />
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Signup
