import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

interface JwtPayload {
    isValid: boolean
    email: string
    id: string
    iat: number
    exp: number
}


class JWTHelper {

    secretKey!: string

    static getSecretKey () : string {
        let secretKey: string = ''
        secretKey = process.env.JWT_TOKEN || secretKey
        return secretKey
    }

    signToken(email:string, id:string) : string {
        const token: string = jwt.sign({email, id}, JWTHelper.getSecretKey(), {expiresIn: '48h'})
        return token
    }

    async verifyToken(token: string) : Promise<JwtPayload> {
        let status :JwtPayload  = {isValid: false, email: '', id: '', iat: 0, exp: 0}
        jwt.verify(token, JWTHelper.getSecretKey(), (err, res : any) => {
            if (res) {
                const {email, id, iat, exp} = res
                status = {isValid: true, email, id, iat, exp}
            }
        })
        return await status
    }

}

export default JWTHelper