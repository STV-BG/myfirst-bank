import express from 'express';
import cors from 'cors';


import config from '@/config';



 const app = express();

app.use(cors());


 app.get('/', (req, res) =>{
    res.json({
        message:'Hello world',
    });
});


app.listen(config.PORT,()=>{
    console.log(`Server radi na portu: http://localhost:${config.PORT}`);
});
