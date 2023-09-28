import User from '../models/userModel.js'
import StatusCodes from 'http-status-codes'
import { hashPasswod, verifyPassword } from '../utils/passwordUtils.js'
import { createJWT_TOKEN } from '../utils/tokenUtils.js'
import { cookie } from 'express-validator'


export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        res.json({user})
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"INTERNAL SERVER ERROR"})
    }
} 


export const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const isUserExist = await User.findOne({email})
        if(isUserExist){
            return res.status(StatusCodes.BAD_GATEWAY).json({message: "User already exist"})
        }
        const hashPwd = await hashPasswod(password) 
        const user = await User.create({name, email, password: hashPwd})
        const token = createJWT_TOKEN({userId: user._id})
        res.status(StatusCodes.CREATED).cookie('token', token, 
            {expires: new Date(Date.now() + 1000*60*60*24*3)}).json({user})
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"INTERNAL SERVER ERROR"})
    }
}


export const loginUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({message:"Wrong Email or Register First"})
        }
        const isMatchPwd = await verifyPassword(password, user.password)
        if(!isMatchPwd) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Wrong Password"})
        }
        const token  = createJWT_TOKEN({userId: user._id})
        res.status(StatusCodes.OK).cookie('token', token, 
            {expires: new Date(Date.now() + 1000*60*60*24*3)}).json({
            user:{
                name: user.name, 
                email: user.email, 
                _id: user._id 
            }
        })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"INTERNAL SERVER ERROR"})
    }
}

export const logOutUser = (req, res) => {
    res.status(StatusCodes.OK).cookie('token', '', {expires: new Date(Date.now())}).json({message: "User Logout Successfully"})
}