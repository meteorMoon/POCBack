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
 *       name:
 *         type: string
 *       password:
 *         type: string
 *       email:
 *         type: string
 *    
 *     
 *       
 * paths:
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
 *    summary: with the credentials of the user returns the token for the next petitions in case the token is wrong then it return error
 *    parameters:
 *      - in: body
 *        name: user
 *        schema: 
 *          "$ref": "#/components/schemas/User"
 *        
 * 
 *  /listproducts:
 *   get:
 *    summary: return al products in db
 *  
 *  /addproduct:
 *   post:
 *    summary: add product to cart if the cart doesnt exist create one
 *    parameters:
 *     - in: headers
 *       name: auth-token
 *       schema:
 *         type: string
 *     - in: body
 *       name: addproduct  
 *       schema: 
 *        type: object
 *        required:
 *          - id_producto
 *          - cantidad
 *        properties:
 *          id_producto:
 *            type: string
 *          cantidad:
 *            type: number
 *    
 *  /showcart:
 *   get:
 *    summary: show the products inside the cart
 *    parameters:
 *     - in: headers
 *       name: auth-token
 *       schema:
 *        type: string
 * 
 *  /deleteproduct:
 *    get:
 *     parameters:
 *      - in: headers
 *        name: auth-token
 *        schema:
 *          type: string
 *      - in: body
 *        name: delete product
 *        schema:
 *          type: object
 *          required:
 *            - id_product
 *          properties:
 *           id_product:
 *            type: number
 *  /payBill:
 *    get:
 *     parameters:
 *      - in: headers
 *        name: auth-token
 *        schema:
 *          type: string
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
