import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";


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
    //check if product already exists
    const product= await (await pool.query("SELECT id_producto FROM producto p WHERE id_producto=$1",[req.body.id_producto])).rowCount;
    if(product == 0) {
      return resp.status(404).json({"message":"product not found"});
    }
    // check if user have a bill
    const response:QueryResult = await pool.query("select * from factura f,users u where u.id_user=f.id_user and u.id_user=$1 and f.ispaid=false limit 1",[req.userId]);
    const result:Number=response.rowCount;
    if(result == 0) {
      //create a new bill
      await pool.query("insert into factura(id_user,fecha,ispaid) values($1,'now()',false )",[req.userId]);
    }

    // insert product into a bill
    await pool.query(`
                    insert into details(id_factura,id_producto,cantidad)
                    select id_factura,$1,$2 from factura f,users u 
                    where 
                    u.id_user=f.id_user and 
                    f.ispaid=false and 
                    u.id_user=$3;
    `,[req.body.id_producto,req.body.cantidad,req.userId]);
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



