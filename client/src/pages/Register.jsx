import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import axios from 'axios'
import { USER_REGISTER_BEGIN, USER_REGISTER_ERROR, USER_REGISTER_SUCCESS } from "../context/reducer"
import { toast } from 'react-toastify'


const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {dispatch, isLoading, user} = useUserContext()

    const handleUserRegister = async (e) => {
      e.preventDefault()
      dispatch({type: USER_REGISTER_BEGIN})
      try {
        const res = await axios.post('http://localhost:4000/api/v1/auth/register', {name, email, password}, {withCredentials: true})
        console.log(res);
        dispatch({type: USER_REGISTER_SUCCESS, payload: res.data.user})
        toast.success("User Registration Successfully")

      } catch (error) {
        dispatch({type: USER_REGISTER_ERROR})
        toast.error(error.response.data.message)
        console.log(error);
      }
    } 
    if(user){
        return <Navigate to="/" />
    }
  return (
    <section className='loginMainContainer'>
        <div className="loginContainer">
            <form onSubmit={handleUserRegister}>
              <h1>Register</h1>
                <input 
                type="text" 
                placeholder='Jhon doe' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
                <input 
                type="email" 
                placeholder='your@email.com' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input 
                type="password" 
                placeholder='password....' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type='submit' disabled={isLoading}>Register</button>
                <p>Already have account ? <Link to="/login">Login</Link></p>
            </form>
        </div>
    </section>
  )
}

export default Register