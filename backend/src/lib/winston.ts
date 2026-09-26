/*
instalirni modulu
*/
import winston, { level } from "winston";
/*
custom moduli
*/
import config from "@/config";
import { time } from "node:console";

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;
const transports: winston.transport[] = [];

if (config.NODE_ENV != "production") {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), //boje ,za sve niovoe logova
        timestamp({ format: "YYYY-MM-DD hh:mm:ss" }), // dodavanje timestamp-a u log
        align(), //aligni log poruke
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : "";
          return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
        }),
      ),
    }),
  );
}

//kreiranje instance logera

const logger = winston.createLogger({
    level: config.LOG_LEVEL || 'info', //default nivo za logovanje nivoa u info
    format: combine(timestamp(), errors({ stack:true}), json()), // json format za logovanje
transports,
silent:config.NODE_ENV === 'test', // iskljuci log u test env
})

export { logger};
