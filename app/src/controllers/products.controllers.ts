import { Request, Response } from "express";
import { QueryResult } from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../database";
import { v4 } from "uuid";


export const listProducs=async (req: Request, resp: Response): Promise<Response> => {
    return resp.status(200).json({
        message: "show products"
      });
};

export const addProductTocart=async (req: Request, resp: Response): Promise<Response> => {
    return resp.status(200).json({
        message: "añadir x producto"
      });
};

export const deletePorductToCart=async (req: Request, resp: Response): Promise<Response> => {
    return resp.status(200).json({
        message: "quitar x producto"
      });
};

export const payBill=async (req: Request, resp: Response): Promise<Response> => {
    return resp.status(200).json({
        message: "validar pago"
      });
};



