import jwt from 'jsonwebtoken'


export const createJWT_TOKEN = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_LIFETIME}
    )
    return token
}

export const verifyJWT_TOKEN =(token) => {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
    return tokenDecoded
}