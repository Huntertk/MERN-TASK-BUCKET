import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { toast } from 'react-toastify';
import '../styles/login.scss'
import axios from "axios"
import { useUserContext } from "../context/UserContext"
import { USER_REGISTER_BEGIN, USER_REGISTER_ERROR, USER_REGISTER_SUCCESS } from "../context/reducer"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {dispatch, isLoading, user} = useUserContext()

    const handleUserLogin = async (e) => {
      e.preventDefault()
      dispatch({type: USER_REGISTER_BEGIN})
      try {
        const res = await axios.post('http://localhost:4000/api/v1/auth/login', {email, password}, {withCredentials: true})
        console.log(res);
        dispatch({type: USER_REGISTER_SUCCESS, payload: res.data.user})
        toast.success("User Login Successfully")

      } catch (error) {
        dispatch({type: USER_REGISTER_ERROR})
        toast.error(error.response.data.message)
        console.log(error.response.data.message);
      }
    } 

    if(user){
      return <Navigate to="/" />
    }
  return (
    <section className='loginMainContainer'>
        <div className="loginContainer">
            <form onSubmit={handleUserLogin}>
              <h1>Login</h1>
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
                <button type="submit" disabled={isLoading}>Login</button>
                <p>Don't have account ? <Link to="/register">Register</Link></p>
            </form>
        </div>
    </section>
  )
}

export default Login