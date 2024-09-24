import bcrypt, { compare } from 'bcrypt';

// Hashing the password
export const hashPassword = async (password) => {
    try {
        const saltround = 10;
        const hashedPassword = await bcrypt.hash(password, saltround);
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}

// for checking if password is correct or not 
export const comparePassword = async (password, hashedPassword) => {
        return compare(password, hashedPassword);
    }