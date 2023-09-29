import React, { useEffect } from 'react'
import axios from 'axios'
import '../styles/home.scss'
import { useTaskContext } from '../context/taskContext/TaskContext'
import { ALL_TASK_FETCHING } from '../context/taskContext/reducer'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'

const Home = () => {
  const {task, dispatch} = useTaskContext()
  useEffect(() =>{
    axios.get('http://localhost:4000/api/v1/task/get-all-task', {withCredentials: true}).then(res => dispatch({type: ALL_TASK_FETCHING, payload:res.data.task}))
  },[])

  if(!task){
    return <h1>Loading....</h1>
  }
  return (
    <section className='homeMainSection'>
      <div className="taskMainContainer">
        {task.length === 0 && <div className='taskCard'><h1>You have no task assigned</h1></div>}
        {task?.map((item, index) => {
          return (
            <div key={item._id} className='taskCard'>
                <h1>{index + 1} {item.title}</h1>
              <h3>{item.description.substring(1, 100)}</h3>
              <div className="iconsContainer">
                <BiEdit />
                <MdDelete />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Home