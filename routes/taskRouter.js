import {Router} from 'express'
import { getAllTask, createTask} from '../controllers/taskController.js'
import { validateUserTask } from '../middlewares/validateUserMiddleware.js'

const router = Router()

router.get("/get-all-task", getAllTask)
router.post("/create-task", validateUserTask, createTask)


export default router