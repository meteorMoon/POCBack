import { Router } from "express";

import { getUsers, getUserById, createUser, deleteUser, updateUserById, loginUser } from "../controllers/index.controller";
import { TokenValidation } from "../libs/validateToken";

const router = Router();

router.get("/users", getUsers);
router.post("/login", loginUser);
router.get("/users/:id", TokenValidation, getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUser);

export default router;
