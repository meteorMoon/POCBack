import {Request,Response} from 'express'
import { QueryResult } from 'pg';

import {pool} from '../database'


export const getUsers=async (req: Request,resp: Response): Promise<Response> => {
    try{
        const response:QueryResult=await pool.query('SELECT * FROM users');
        console.log(response.rows);
        return resp.status(200).json(response.rows);
    }
    catch(e){
        return resp.status(500).json({
            message:'Error',
            error:e
        });
    }

}