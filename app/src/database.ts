import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  //uncomment for use without docker with database in localhost
  //host: "localhost",
  // comment for use without docker
  host:"postgres",
  database: "typescriptdatabase",
  password: "mysecretpassword",
  port: 5432
});
