import { Router } from "express";
import { getUsers, getByIdUser, saveUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();
router.get('/',getUsers);
router.post('/', saveUser );
router.get('/:id', getByIdUser );
router.delete('/:id', deleteUser);

export default router