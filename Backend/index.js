import  express  from "express";
import { postgraphile } from "postgraphile";

const app = express();

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

app.listen(3000, () =>{
    console.log('escuchando en el puerto 3000');
});