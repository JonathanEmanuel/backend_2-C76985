import bcrypt from 'bcrypt';

export const createHash = async ( plainPassword ) => {
    const saltRounds = 10;
    return bcrypt.hash(plainPassword,saltRounds );
}

export const isValidPassword = async ( plainPassword, hashedPassword ) => {
    return bcrypt.compare( plainPassword, hashedPassword);
}
