import { Router } from "express";

import { getUsers, getUserById, createUser, deleteUser, updateUserById, loginUser } from "../controllers/index.controller";
import { addProductTocart,deletePorductToCart,payBill,listProducts,showCart} from "../controllers/products.controllers";
import { TokenValidation } from "../libs/validateToken";

const router = Router();

//users crud

router.get("/users", getUsers);
router.post("/login", loginUser);
router.get("/users/:id", TokenValidation, getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUser);

//products buy crud

router.get("/listproducts", listProducts);
router.post("/addproduct",TokenValidation, addProductTocart);
router.get("/showcart",TokenValidation ,showCart);
router.get("/deleteproduct",TokenValidation, deletePorductToCart);
router.get("/payBill", TokenValidation,payBill);

export default router;
