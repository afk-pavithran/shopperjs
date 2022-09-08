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
        const salt = await BcryptHelper.getSalt()
        const hashedPassword = await bcrypt.hash(this.password, salt)
        return hashedPassword
    }

    async compareHashPassword (hashedPassword: string) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(this.password, hashedPassword, (err, res) => {
                if (res) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        })
    }

    getBcrypt() {
        return bcrypt
    }
}

export default BcryptHelper