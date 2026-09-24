/*
instalirni modulu
*/
import winston from 'winston';
/*
custom moduli
*/
import config from '@/config';

const { combine, timestamp, json, errors, align, printf, colorize}=winston.format;
const transoprt: winston.transport[]=[];

if(config.NODE_ENV != 'production'){
    transoprt.push(
        new winston.transports.Console({
        format:combine(
            colorize({/*....*/}),
            timestamp({/* ...*/})
        )
        })
        
        
    )

}
