import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { USER_INITIAL_FETCH, reducer } from "./reducer";


const UserContext = createContext()
const initialState = {
    user: null,
    isLoading: false
}

const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    
    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/auth/get-user',{withCredentials: true}).then((res) => dispatch({type: USER_INITIAL_FETCH, payload: res.data.user}))
    }, [])


    return(
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
    
}

const useUserContext = () => useContext(UserContext)

export {UserContextProvider, useUserContext}