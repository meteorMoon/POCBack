import { Request, Response } from "express";
import { QueryResult } from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../database";
import { v4 } from "uuid";


export const listProducts=async (req: Request, resp: Response): Promise<Response> => {
  try {
    const response:QueryResult = await pool.query("SELECT * FROM producto");
    console.log(response.rows);
    return resp.status(200).json(response.rows);
  } catch (e) {
    return resp.status(500).json({
      message: "Error",
      error: e
    });
  }
};

export const addProductTocart=async (req: Request, resp: Response): Promise<Response> => {
  try {
    const response:QueryResult = await pool.query(`select * from factura f,users u where u.id_user=f.id_user and u.id_user=${req.userId} and f.ispaid=false limit 1`);
    const result:Number=response.rows.length;
    if(result == 0) {
      await pool.query(`insert into factura(id_user,fecha,ispaid) values(${req.userId},'now()',false )`);
    }
    await pool.query(`
                    insert into details(id_factura,id_user,id_producto,cantidad)
                    select id_factura,u.id_user,${req.params.id_producto} as product,${req.params.cantidad} as cantidad from factura f,users u 
                    where 
                    u.id_user=f.id_user and 
                    f.ispaid=false and 
                    u.id_user=${req.userId};
    `);
    return resp.status(200).json({"result":"success"});
  } catch (e) {
    return resp.status(500).json({
      message: "Error",
      error: e
    });
  }
};


export const showCart=async (req: Request, resp: Response): Promise<Response> => {
  return resp.status(200).json({
    message: "mostrar productos"
  });
}
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



