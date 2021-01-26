/*this class  is used for encrypt and decrypt data */
import * as bcrypt from 'bcrypt';

export class Cripthography {

    /*Constructor Method */
    constructor() { }

    // Encrypt Method
    public async encryptPassword(password: string) {
        try {
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);

            return hash;
        } catch (error) {
            return error;
        }

    };
    public async matchPassword(password: string, savedPassword: string) {

        return await bcrypt.compare(password, savedPassword);

    };
}
 
