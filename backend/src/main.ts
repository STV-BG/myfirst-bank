//Predifinisani i instalirani moduli

import express from "express";
import cors, { CorsOptions } from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import config from "@/config";
import limiter from '@/lib/express_rate_limit';
const app = express();

// konfiguraicja CORS //
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      //odbijanej svi zhatev prema server koji nisu whitelist
      callback(
        new Error(`CORS error: $(origin) nije dozvojlej od strane CORS-a`),
        false,
      );
      console.log(`CORS error: $(origin) nije dozvojlej od strane CORS-a`);
    }
  },
};
//Definicija CORS middlewere-a//

app.use(cors(corsOptions));

//JSON request body parsiranje //
app.use(express.json());

//Ukljucivanje URL-encoded zahteva parsiranja body-ja pomocu extended rezima //
//extended resim se postavlja na true (extended : true),dozvoljava objekete ili nizove query stringova//

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//ukljucujemo response kompresiju ;radi se kako bi se izbegao kompleksan payload,a poboljsavamo performanse

app.use(
  compression({
    threshold: 1024,
  }),
);
//poboljsavanje bezbednosti pomocu razlicitih HTTP headera
app.use(helmet());

//rate limiter , ogranicavanje middleware-a
app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(config.PORT, () => {
  console.log(`Server radi na portu: http://localhost:${config.PORT}`);
});
