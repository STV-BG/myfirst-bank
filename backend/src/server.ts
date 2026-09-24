import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

import config from "@/config";
import limiter from "@/lib/express_rate_limit";
import {connectToDatabase, disconnectFromDatabase}from '@/lib/mongoose';

//Ruter /ruter
import v1Routes from "@/routes/v1/inidex";

//Express server inicijalno
const app = express();

//configuracija  CORS opcija
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      //odbijanje svih zahteva prema serveru koji nisu whitelist
      callback(
        new Error(`CORS error: ${origin} nije dozvoljen od strane CORS-a`),
        false,
      );
      console.log(`CORS error: ${origin}nije dozvoljen od starne CORS-A`);
    }
  },
};

app.use(cors(corsOptions)); //DEfinicija CORS  middleware-a

//JSON request body paresr
app.use(express.json());

/*Ukljucivanje URL-encoded zahteva parisranja body-ja pomocu extended rezima etended rezim se postavlja na true
(extended:true),dozvoljava objekte ili nizove query stringova
*/

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Ukljucujemo respones kompresiju; radi se kako bi se izbegao kompleksan peyload, a poboljsavamo performanse

app.use(
  compression({
    threshold: 1024,
  }),
);
//poboljasavanje bezbednosti pomocu razlicitih HTTP heaer-a
app.use(helmet());

// rate limiter, ogranicavanje middleware-a
app.use(limiter);

//Instnt se ucitava asihrna funkcija kako bi startovala serer
//Pokusava da se nakaci na bazu pre inicijalizacije servera
//Definisana api ruta '/api/v1'
//startujemo aplikacij na portu  i imamo log na nivou URL-a
//Ukoliko imamo gresku, ista je logoana u konzoli i izvrsava se process1 , tj,exit

(async () => {
  try {
        await connectToDatabase();

    app.use("/api/v1", v1Routes);
    app.listen(config.PORT, () => {
      console.log(`Server radi na portu: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.log("Neuspesno pokretanje server", err);
    if (config.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();

//Funkcionalnost servera prilikom gasenja,tj diskonektovanja sa baze/Pokusaj da se diskonekt.server sa baze
//Log uspesne poruke da je diskonetovanje uspesno / Ukoliko se desi greska prilikom diskonekt. sa servera - prikazujemo u konzoli (log)
//Exit process. sa status kodom 0 - predstavlaj uspesan status, u nasem sluvaju shutdown

const handleServerShutdown = async()=>{
  try{
    await disconnectFromDatabase();
    console.log('Server se gasi');
  process.exit(0);
  }catch(err){
    console.log('Greska prilikom gasenja servera',err)
  }
  
};
//Signali / SIGTERM - stopiranje procesa(kill komanda)
//SIGINT - kada korisnik pravi interrupt procesa (ctrl+c)
//Signali kada pristignu i kada se izvrsi konstanta za gasenje servera, oni osiguravaju da je bilo pravilno gasenje

process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);