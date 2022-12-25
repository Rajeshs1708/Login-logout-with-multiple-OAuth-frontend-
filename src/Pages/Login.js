import React, { useState } from 'react'
import './Login.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Google from '../Img/Google.png';
import Facebook from '../Img/Facebook.png';
import Github from '../Img/Github.png';

const Login = () => {

    const navigate = useNavigate()


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
            if (email && password) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/signin`, { email: email, password: password })
                    .then(res => {
                        if (res) {
                            const notify = () => toast.success(`Welcome Mrs/Mr.${res.data.user.name}`, { autoClose: 3000, theme: "colored", });
                            notify()
                            localStorage.setItem('TOKEN', res.data.token)
                            localStorage.setItem('NAME', res.data.user.name)
                            localStorage.setItem('EMAIL', res.data.user.email)
                            setTimeout(() => {
                                navigate('/home')
                            }, 3000)
                        }
                    })
                    .catch(err => {
                        const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
                        notify()
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
                        <div className='loginButton facebook' title="facebook couldn't open due to some security reason" onClick={facebook}>
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
                            <input className='mb-3' value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' />
                            <input className='mb-3' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' /><br />
                            <button className='submit pink darken-4 white-text btn'>Login</button><br /><br />
                            <ToastContainer autoClose={3000} theme="colored" />
                            <p>Don't have an account ? <Link to='/signup'>Signup</Link></p>
                            <Link to='/forgetpassword'>Forget Password</Link>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login
