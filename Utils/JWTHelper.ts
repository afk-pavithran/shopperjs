import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

interface JwtPayload {
    isValid: boolean
    email: string
    userId: number
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

    signToken(email:string, id:number) : string {
        const token: string = jwt.sign({email, id}, JWTHelper.getSecretKey(), {expiresIn: '48h'})
        return token
    }

    async verifyToken(token: string) : Promise<JwtPayload> {
        let status :JwtPayload  = {isValid: false, email: '', userId: 0, iat: 0, exp: 0}
        jwt.verify(token, JWTHelper.getSecretKey(), (err, res : any) => {
            if (res) {
                const {email, userId, iat, exp} = res
                status = {isValid: true, email, userId, iat, exp}
            }
        })
        return await status
    }

}

export default JWTHelper