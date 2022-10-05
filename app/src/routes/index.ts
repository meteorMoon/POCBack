import { Router } from "express";

import { getUsers, getUserById, createUser, deleteUser, updateUserById, loginUser } from "../controllers/index.controller";
import { addProductTocart,deletePorductToCart,payBill,listProducts,showCart} from "../controllers/products.controllers";
import { TokenValidation } from "../libs/validateToken";

const router = Router();

//users crud
/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 * 
 * paths:
 *  /tasks:
 *   get:
 *    summary: uwux3
 * 
 *  /users/{id}:
 *   get:
 *    parameters:
 *     - in: path
 *       name: id   # Note the name is the same as in the path
 *       required: true
 *       schema:
 *        type: integer
 *        minimum: 1
 *    description: The user ID
 * 
 *  /login:
 *   post:
 *    parameters:
 *     - in: query
 *       name: X-Request-ID
 *       schema:
 *         type: string
 *    requestBody:
 *     description: the credentials of the users
 *     required: true
 *     content:
 *      application/json:
 *       "schema": {
 *         "$ref": "#/components/schemas/User"
 *       }
 * 
 *   
 * */
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
