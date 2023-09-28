import bcrypt from 'bcryptjs'

export const hashPasswod = async (passwrod) => {
    const salt = await bcrypt.genSalt(10)
    const hashPwd = await bcrypt.hash(passwrod, salt)
    return hashPwd
}

export const verifyPassword = async (passwrod, hashPwd) => {
    const matchPwd = await bcrypt.compare(passwrod, hashPwd)
    console.log(matchPwd);
    return matchPwd
}