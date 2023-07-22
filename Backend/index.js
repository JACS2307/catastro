import  express  from "express";
import { postgraphile } from "postgraphile";
import cors from 'cors';
const app = express();

app.use(cors())

app.use(
    postgraphile(
        "postgres://postgres:12345@localhost:5432/base_catastro",
        "public",
        {
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true
        },
    ),
);

app.listen(4000, () =>{
    console.log('escuchando en el puerto 4000');
});