//Node moduli


import { Router } from "express";
import { timeStamp } from "node:console";
import { version } from "node:os";

const router = Router();
//Koren ruta

 router.get("/", (req, res) => {
      // sending message
      res.status(200).json({
        message: "Api je operativan",
        status: 'ok',
        version: '1.0',
        docs:'',
        timeStamp:new Date().toISOString(),
      });
    });

     export default router;