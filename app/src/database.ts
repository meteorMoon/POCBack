import { Pool } from "pg";

export const pool = new Pool({
  user: "qxsclqen",
  //uncomment for use without docker with database in localhost
  //host: "localhost",
  // comment for use without docker
  host:"babar.db.elephantsql.com",
  database: "qxsclqen",
  password: "tmIY7rfVGMVwVeOQtYh-z8R6x5cUQQma",
  port: 5432
});
