import {body, validationResult} from 'express-validator'
import StatusCodes from 'http-status-codes'

const withValidationError = (validateValues) => {
    return [
        validateValues,
        (req, res, next)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                const errorMessage = errors.array().map(error => error.msg)
                return res.status(StatusCodes.BAD_REQUEST).json({message: errorMessage[0]})
            }
            next()
        }
    ]
}


export const validateRegisterUser = withValidationError([
    body('name')
        .notEmpty()
        .withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Please enter valid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:8})
        .withMessage('Password must be more than 8 character')
])


export const validateLoginUser = withValidationError([
     body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Please enter valid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:8})
        .withMessage('Password must be more than 8 character')
])

export const validateUserTask = withValidationError([
     body('title')
        .notEmpty()
        .withMessage('title is required'),
    body('description')
        .notEmpty()
        .withMessage('description is required')
])