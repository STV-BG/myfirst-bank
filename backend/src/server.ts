import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

import config from "@/config";
import limiter from "@/lib/express_rate_limit";
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

(async () => {
  try {
    app.get("/", (req, res) => {
      // sending message
      res.json({
        message: "Hello world",
      });
    });
    app.listen(config.PORT, () => {
      console.log(`Server radi na portu: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.log("Neuspesno pokretanje server", err);
  }
})();



