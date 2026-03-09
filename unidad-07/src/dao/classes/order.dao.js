import orderModel from "../models/order.model.js";

export default class Order {
    getOrders = async () => {
        try {
            const orders = await orderModel.find();
            return orders;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    getOrderById = async (id) => {
        try {
            const order = await orderModel.findById(id);
            return order;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    saveOrder= async (order) => {
        try {
            const order = await orderModel.create(order)
            return order;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
    updateorder= async (id, order) => {
        try {
            const result = await orderModel.findByIdAndUpdate(id, order)
            return result;
        } catch (error) {
            console.error( error);
            return null;
        }
    }
}
