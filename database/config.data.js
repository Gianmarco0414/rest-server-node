import { createPool } from "mysql2/promise";

export const dbConnection=createPool({
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'user_node_cafe'
    })
    //console.log('db conectada')