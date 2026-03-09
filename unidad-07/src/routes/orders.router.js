import { Router } from "express";
import { getOrders, getByIdOrder, saveOrder, deleteOrder } from '../controllers/orders.controller.js'

const router = Router();
router.get('/', getOrders);
router.post('/', saveOrder );
router.get('/:id', getByIdOrder );
router.delete('/:id', deleteOrder);


export default router