import Task from "../models/taskModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllTask = async (req, res) => {
    try {
        const task = await Task.find({createdBy: req.user}).sort({createdAt: -1})
        res.status(StatusCodes.OK).json({task})
    } catch (error) {
        
    }
}

export const createTask = async (req, res) => {
    const {title, description} = req.body
    try {
        const task = await Task.create({title, description, createdBy: req.user})
        res.status(StatusCodes.OK).json({task})
        
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"INTERNAL SERVER ERROR"})
    }
} 
