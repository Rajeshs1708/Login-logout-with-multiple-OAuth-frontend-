import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Google from '../Img/Google.png';
import Facebook from '../Img/Facebook.png';
import Github from '../Img/Github.png';

const NewPassword = () => {

    const navigate = useNavigate()

    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
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
            if (otp && password) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/submit-otp`, { otp: otp, password: password })
                    .then(res => {
                        if (res.data.code === 200) {
                            const notify = () => toast.success(`*${res.data.message}*`, { theme: 'colored' });
                            notify()
                            setError(`${res.data.message}`)
                            setTimeout(() => {
                                navigate('/login')
                            }, 2000)
                        } else {
                            const notify = () => toast.error(`*${res.data.message}*`, { theme: 'colored' });
                            notify()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
                        notify()
                    })

            } else {
                const notify = () => toast.error("* Invalid input *", { theme: 'colored' });
                notify()
            }
        } catch (err) {
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
                            <h5 className='error'>{error}</h5><br />
                            <input className='mb-4' value={otp} onChange={e => setOtp(e.target.value)} type="text" placeholder='Enter your OTP' required />
                            <input className='mb-4' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Enter New Password' required />
                            <button className='submit pink darken-4 white-text btn'>Submit</button>
                            <ToastContainer autoClose={3000} theme="colored" />
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NewPassword
