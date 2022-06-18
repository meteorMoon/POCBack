import { Pool } from 'pg'

export const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'typescriptdatabase',
    password: 'mysecretpassword',
    port: 5432,
});
