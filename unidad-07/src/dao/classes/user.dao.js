import userModel from "../models/user.model.js";

export default class Users {
    getUsers = async () => {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    getUserById = async (id) => {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    saveUser= async (user) => {
        try {
            const user = await userModel.create(user)
            return user;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    updateUser= async (id, user) => {
        try {
            const result = await userModel.findByIdAndUpdate(id, user)
            return result;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
}
