import { useState } from "react"
import '../styles/addtask.scss'
import {useUserContext} from '../context/UserContext'
import {Navigate, redirect} from 'react-router-dom' 
import { useTaskContext } from "../context/taskContext/TaskContext"
import axios from "axios"
import { toast } from 'react-toastify'
import { TASK_CREATING_BEGIN, TASK_CREATING_ERROR, TASK_CREATING_SUCCESS } from "../context/taskContext/reducer"

const AddTask = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {user} = useUserContext()
  const {dispatch} = useTaskContext()
  const handleCreateTask = async (e) => {
    e.preventDefault()
    dispatch({type: TASK_CREATING_BEGIN})
    try {
      const res = await axios.post('http://localhost:4000/api/v1/task/create-task', {title, description}, {withCredentials: true})
      console.log(res);
      dispatch({type: TASK_CREATING_SUCCESS})
      toast.success("Task Created Successfully")
      setRedirect(true)
    } catch (error) { 
      console.log(error);
      dispatch({type: TASK_CREATING_ERROR})
      toast.error("Something Went Wrong")
    }
  }


  if(redirect){
    return <Navigate to="/" />
  }
  if(!user){
    return <Navigate to="/login" />
  }
  return (
    <section className='bookMainContainer'>
        <div className="bookContainer">
            <form onSubmit={handleCreateTask}>
              <h1>Add Task</h1>
                 <input 
                type="text" 
                placeholder='enter task title' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
                <textarea 
                type="text" 
                placeholder='enter task description....' 
                rows="40"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
                <button type="submit">Add Book</button>
            </form>
        </div>
    </section>
  )
}

export default AddTask