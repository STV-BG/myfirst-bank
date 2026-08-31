//import modula
import {rateLimit} from "express-rate-limit";
 //konfig i ogranicavanje sa ciljem smanjnja napada

const limiter =rateLimit({
    windowMs:60000, //1min.
    limit:60,//60 max broj zahteba po IP adressi , po prozoru
    standardHeaders:'draft-8',//poslednju rate-limit standard, 
    legacyHeaders:false,//disable starih/povucenih x-ratelimit headera
    message:{
        error:
        'Poslali se mnogo zateva u kratkom vremenskom intervalu. Pokusajte kasnije.'
    },
});

export default limiter;