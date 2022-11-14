import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";


export const listProducts=async (req: Request, resp: Response): Promise<Response> => {
  try {
    const response:QueryResult = await pool.query("SELECT * FROM product");
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
    console.log(req.body.id_product);
    const product= await (await pool.query("SELECT id_product FROM product p WHERE id_product=$1",[req.body.id_product])).rowCount;
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
                    insert into details(id_factura,id_product,cantidad)
                    select id_factura,$1,$2 from factura f,users u 
                    where 
                    u.id_user=f.id_user and 
                    f.ispaid=false and 
                    u.id_user=$3;`
                    ,[req.body.id_product,req.body.cantidad,req.userId]);
    return resp.status(200).json({"result":"success"});
  } catch (e) {
    return resp.status(500).json({
      message: "Error",
      error: e
    });
  }
};


export const showCart=async (req: Request, resp: Response): Promise<Response> => {
  try {
    const response:QueryResult = await pool.query(`select p.nombre, d.cantidad, (p.precio * d.cantidad) as precio
    from factura f,users u,details d,product p 
    where f.id_factura = d.id_factura and u.id_user=f.id_user and p.id_product = d.id_product and f.ispaid=false and u.id_user=$1`,[req.userId]);
    console.log(response.rows);
    return resp.status(200).json(response.rows);
  } catch (e) {
    return resp.status(500).json({
      message: "Error",
      error: e
    });
  }
}
export const deletePorductToCart=async (req: Request, resp: Response): Promise<Response> => {
  try {
    
    const response:QueryResult =  await pool.query(
    `delete from details 
    where 
    id_factura = (select id_factura from factura where id_user=$2 and ispaid = false) and
    id_product = $1 ;`, [req.body.id_product,req.userId]);
      
    const result:Number=response.rowCount;
    if(result == 0 ) {

       return resp.status(500).json({"result":"Can´t find any element"});
       
    }
    return resp.status(200).json({"result":"success"});

  } catch (e) {
    return resp.status(500).json({
      message: "Error",
      error: e
    });
  }
};

export const payBill=async (req: Request, resp: Response): Promise<Response> => {
  try {

    const response:QueryResult =  await pool.query(`
    update factura 
    set ispaid= true
    where 
    id_user=$1 and ispaid = false ;`, [req.userId]);
      
    const result:Number=response.rowCount;
    if(result == 0 ) {

       return resp.status(500).json({"result":"Can´t find any element"});
       
    }

     return resp.status(200).json({"result":"success"});
    
    } catch (e) {
      return resp.status(500).json({
        message: "Error",
        error: e
      });
    }
};



