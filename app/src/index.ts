import express from "express";

import indexRoutes from "./routes/index";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(indexRoutes);

app.listen(80, () => {
  console.log("server is running on port 80");
});
