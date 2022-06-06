import { Pool } from 'pg'

export const pool=new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'typescriptdatabase',
    password: 'mysecretpassword',
    port: 5432,
});
