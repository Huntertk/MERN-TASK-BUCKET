import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model('Task', taskSchema)