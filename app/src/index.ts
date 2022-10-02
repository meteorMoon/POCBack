import express from "express";
import swaggerUI from "swagger-ui-express"
import swaggerJsDocs from "swagger-jsdoc"
import { options } from "./swaggetOpts";

import indexRoutes from "./routes/index";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const spec=swaggerJsDocs(options)

app.use(indexRoutes);
app.use('/docs',swaggerUI.serve,swaggerUI.setup(spec));



app.listen(80, () => {
  console.log("server is running on port 80");
});
