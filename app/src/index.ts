import express from "express";
import swaggerUI from "swagger-ui-express"
import swaggerJsDocs from "swagger-jsdoc"
import { optionsApi,optionsSwagger } from "./swaggetOpts";
import cors from 'cors'

import indexRoutes from "./routes/index";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const spec=swaggerJsDocs(optionsApi)

app.use(cors())
app.use(indexRoutes);



app.use('/docs',swaggerUI.serve,swaggerUI.setup(spec,optionsSwagger));



app.listen(80, () => {
  console.log("server is running on port 80");
});
