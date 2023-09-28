import React from 'react'
import {Navigate} from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

const ProtectedRoutes = ({children}) => {
    const {user} = useUserContext()

    if(!user){
        return <Navigate to="/login" />
    }
  return (
    <>
        {children}
    </>
  )
}

export default ProtectedRoutes