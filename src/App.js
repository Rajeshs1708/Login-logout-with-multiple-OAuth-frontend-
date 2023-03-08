import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Post from './Pages/Post';
import Navbar from './Components/Navbar';
import ForgetPassword from './Pages/ForgetPassword';
import NewPassword from './Pages/NewPassword';
import Signup from './Pages/Signup';
import Charts from './Components/Charts';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        // const url = `${process.env.REACT_APP_BASE_URL}/auth/login/success`
        const url = `${process.env.REACT_APP_BASE_URL}/api/getUser`
        const { data } = await axios.get(url, { withCredentials: true })
        setUser(data.user)
      } catch (error) {
        console.log(`Error While login : ${error}`);
      }
    }
    getUser();
  }, []);

console.log(user);
  
return (
    <Router >
      <div className="app">
        <Navbar user={user} />
        <Routes>
          <Route path='/' element={<Home user={user} />} />
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/newPassword' element={<NewPassword />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/charts' element={<Charts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
