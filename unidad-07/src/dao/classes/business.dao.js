import businessModel from "../models/business.model.js";

export default class Business {
    getBusiness = async () => {
        try {
            const businesss = await businessModel.find();
            return businesss;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    getBusinessById = async (id) => {
        try {
            const business = await businessModel.findById(id);
            return business;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    saveBusiness= async (business) => {
        try {
            const business = await businessModel.create(business)
            return business;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    updateBusiness= async (id, business) => {
        try {
            const business = await businessModel.findByIdAndUpdate(id, business)
            return business;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
}
