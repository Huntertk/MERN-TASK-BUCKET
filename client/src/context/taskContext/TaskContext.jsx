import { createContext, useContext, useReducer } from "react";
import { TASK_SESSION_ENDING, reducer } from "./reducer";


const TaskContext = createContext()

const initialState={
    isLoading: false,
    task: null
}


const TaskContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <TaskContext.Provider value={{...state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}


const useTaskContext = () => useContext(TaskContext)

export {useTaskContext, TaskContextProvider}