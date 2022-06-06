import { Router } from "express";

const router = Router();

import {getUsers,getUserById,createUser,deleteUser,updateUserById} from '../controllers/index.controller';

router.get('/users',getUsers)
router.get('/users/:id',getUserById)
router.post('/users',createUser)
router.put('/users/:id',updateUserById)
router.delete('/users/:id',deleteUser)

export default router;