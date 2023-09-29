import React from 'react';
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { USER_LOGOUT } from '../context/reducer';
import { useTaskContext } from '../context/taskContext/TaskContext';
import { TASK_SESSION_ENDING } from '../context/taskContext/reducer';

const Header = () => {
  const {user, dispatch} = useUserContext()
  const { dispatch: taskDispatch } = useTaskContext()

  const handleUserLogout = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/auth/logout', {withCredentials: true})
      console.log(res);
      dispatch({type: USER_LOGOUT})
      taskDispatch({type: TASK_SESSION_ENDING})
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
                  <Link to="/create">Add Task</Link>
                  <p>@{user?.name.toLowerCase()} </p>
                  <button onClick={handleUserLogout}>logout</button>
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