import { Router } from "express";
import { getBusiness, getByIdBusines, saveBusines, deleteBusines, addProduct } from '../controllers/business.controller.js';

const router = Router();
router.get('/', getBusiness );
router.post('/', saveBusines);
router.get('/:id', getByIdBusines );
router.delete('/:id', deleteBusines );

router.post(':id/product', addProduct);

export default router