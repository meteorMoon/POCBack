import { Request, Response } from "express";
import { QueryResult } from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../database";
import { v4 } from "uuid";

export const getUsers = async (req: Request, resp: Response): Promise<Response> => {
  try {
    const response:QueryResult = await pool.query("SELECT * FROM users");
    console.log(response.rows);
    return resp.status(200).json(response.rows);
  } catch (e) {
    return resp.status(500).json({
      message: "Error",
      error: e
    });
  }
};

export const getUserById = async (req:Request, resp:Response): Promise<Response> => {
  const idUser = parseInt(req.params.id);
  const response:QueryResult = await pool.query("select * from users where id=$1", [idUser]);
  return resp.json(response.rows);
};

export const createUser = async (req:Request, resp:Response): Promise<Response> => {
  const { email, name, password } = req.body;
  console.log(name, email);
  //= ===hash password====
  const encryptedPassword:string = await bcrypt.hash(password, 10);
  const uuid:string = v4();
  const response:QueryResult = await pool.query("insert into users(email,name,password,uuid) values($1,$2,$3,$4)", [email, name, encryptedPassword, uuid]);
  return resp.json({
    message: "creado",
    user: {
      name,
      email
    }
  });
};

export const loginUser = async (req:Request, resp:Response): Promise<Response> => {

try {
  const { email, password } = req.body;
  const response:QueryResult = await pool.query("select * from users where email=$1", [email]);
  const passwordHash = response.rows[0].password;
  const isMatch = await bcrypt.compare(password, passwordHash);
  if (isMatch) {
    const token = await jwt.sign({ _id: response.rows[0].uuid }, "secreto", { expiresIn: "1h" });
    return resp.header("auth-token", token).json({
      message: "ok"
    });
  } else {
    return resp.json({
      message: "error"
    });
  }

} catch (error) {
  return resp.json({
      message: "error"
    });
}
};

export const deleteUser = async (req:Request, resp:Response): Promise<Response> => {
  console.log("delete user id");
  const idUser = parseInt(req.params.id);
  const response:QueryResult = await pool.query("delete from users where id=$1", [idUser]);
  return resp.json({
    message: "eliminado"
  });
};

export const updateUserById = async (req:Request, resp:Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { email, name } = req.body;
  const response:QueryResult = await pool.query("update users set email=$1,name=$2 where id=$3", [email, name, id]);
  return resp.json({
    message: "actualizado",
    user: {
      name,
      email
    }
  });
};
