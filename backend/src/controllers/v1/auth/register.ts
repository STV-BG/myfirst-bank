import { logger } from "@/lib/winston";

import config from "@/config";

//Modeli 

// Tipovi

import type { Request, Response } from "express";


const register = async (req: Request, res: Response): Promise <void> =>{
    try{
        res.status(201).json({
            message: 'Napravljen novi korisnik'
        });
    }catch(err){
        res.status(500).json({
            code: ' ServerError',
            message: 'Internal Server Error',
            error:err
        });
        logger.error('Greska prilikom korisnicke registracie', err);
    }

}

export default register;