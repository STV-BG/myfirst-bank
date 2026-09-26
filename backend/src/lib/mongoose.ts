import mongoose from "mongoose";
import config from "@/config";

import { logger } from "@/lib/winston";
//tipovi
import type { ConnectOptions } from "mongoose";
import { log } from "node:console";
 //opcije klijenta

const clientOptions: ConnectOptions = {
  dbName: "myfirst-bank",
  appName: "API-info",
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

/*
Uspostavljanje konekcije prema bazi pomocu mongoose biblioteke//ukoliko dodje do greske - ispisiujemo greesku 
koristimio MONGO_URI-kAO string za konekciju //konstntu clientOptions za konfiguraciju mongoose biblioteke
prikazujemo odgovaruajuce greske i poruke...
*/

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error("MongoDB URI nije definisan u konfiguracija");
  }
  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);
    logger.info("Konekcija prema bazi je uspesna.", {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
  
    
    logger.error("Greska prilikom kacenja na bazu", err);
  }
};

//Diskonekcija sa baze// pokusaji diskonekcije sa baze asinhrono// Ukolik je uspesno (diskonektovan)prikazujemo poruku o tome (log)
//Ukoliko se desi greska, prikazi gresku ili prikazi u konzoli gresku o tome

export const disconnectFromDatabase = async (): Promise<void> => {
  
  try {
    await mongoose.disconnect();
    logger.info("Diskonect prema bazi je uspesna.", {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    logger.error("Greska prilikom diskonektovanja sa bazu", err);
  }
};
