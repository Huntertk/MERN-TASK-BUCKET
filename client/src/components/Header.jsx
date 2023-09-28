import React from 'react';
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { USER_LOGOUT } from '../context/reducer';


const Header = () => {
  const {user, dispatch} = useUserContext()

  const handleUserLogout = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/auth/logout', {withCredentials: true})
      console.log(res);
      dispatch({type: USER_LOGOUT})
      toast.success("User Logout Successfully")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='headerMainContainer'>
        <nav>
        <Link to="/" className='logo'>Task Bucket</Link>
            <ul>
              {user?
                <>
                  <p>@{user?.name.toLowerCase()} </p>
                  <button onClick={handleUserLogout}>Logout</button>
                </> : 
                <>
                <Link to="/login">Login </Link>
                <Link to="/contact">Contact us</Link>
                </>
              }
            </ul>
        </nav>
    </div>
  )
}

export default Header