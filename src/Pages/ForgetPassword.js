import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Google from '../Img/Google.png';
import Facebook from '../Img/Facebook.png';
import Github from '../Img/Github.png';

const ForgetPassword = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [error, setError] = useState('')

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
            if (email) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/send-otp`, { email: email })
                    .then(res => {
                        console.log(`OTP : ${res.data.otp}`);
                        if (res.data.code === 200) {
                            const notify = () => toast.success(`*${res.data.message}: ${res.data.otp}`, { theme: 'colored' });
                            notify()
                            setError(`${res.data.message}: ${res.data.otp}`)
                            setTimeout(() => {
                                navigate('/newPassword')
                            }, 4000)
                        } else {
                            const notify = () => toast.error(`*${res.data.message}*`, { theme: 'colored' });
                            notify()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
                        notify()
                        setError(`Error was *${err.response.data.message}*`)
                    })

            } else {
                const notify = () => toast.error("* Invalid input *", { theme: 'colored' });
                notify()
            }
        } catch (err) {
            setError(" Input Error")
            console.log("Error...", err);
        }
    }

    return (
        <div className='login container-fluid'>
            <h1 className='loginTitle row'>Choose your Login Method</h1>
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
                        <p className='error text-center mb-3'>{error}</p>
                        <input className='mb-4' title='Please go to console for OTP' value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' required />
                        <button className='submit pink darken-4 white-text btn'>Send OTP</button>
                        <ToastContainer autoClose={3000} theme="colored" />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ForgetPassword
