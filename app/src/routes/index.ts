import { Router } from "express";

import { getUsers, getUserById, createUser, deleteUser, updateUserById, loginUser } from "../controllers/index.controller";
import { addProductTocart,deletePorductToCart,payBill} from "../controllers/products.controllers";
import { TokenValidation } from "../libs/validateToken";

const router = Router();

//users crud

router.get("/users", getUsers);
router.post("/login", loginUser);
router.get("/users/:id", TokenValidation, getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUser);

//bills crud

router.get("/addproduct", addProductTocart);
router.get("/deleteproduct", deletePorductToCart);
router.get("/payBill", payBill);

export default router;
