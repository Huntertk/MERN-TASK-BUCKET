import { StatusCodes } from "http-status-codes";
import { verifyJWT_TOKEN } from "../utils/tokenUtils.js";
import User from '../models/userModel.js'

export const authMiddleWare = (req, res, next) => {
    const {token} = req.cookies

    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"Unauthorize Access"})
    }
    try {
        const tokenDecoded =  verifyJWT_TOKEN(token)
        const userId =  tokenDecoded.userId
        req.user = userId
        next()
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({message:"Unauthorize Access"})
    }
}