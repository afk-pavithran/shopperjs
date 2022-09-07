import bcrypt, { genSalt } from 'bcrypt'

class BcryptHelper {
    password: string
    constructor (password : string) {
        this.password = password
    }

    static async getSalt () : Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return salt
    }

    async createHashedPassword() : Promise<string> {
        const salt = await genSalt()
        const hashedPassword = await bcrypt.hash(this.password, salt)
        return hashedPassword
    }
    getBcrypt() {
        return bcrypt
    }
}

export default BcryptHelper