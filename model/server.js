import express from 'express';
import cors from 'cors';
import {router} from '../router/usuarios.routes.js' 
import { dbConnection } from '../database/config.data.js';
export class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.usuariosPath='/api/usuarios';

        //Conectar a base de datos
        //this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    /*conectarDB(){
        dbConnection
    }*/
    middlewares(){
        //CORS
        this.app.use(cors());
        
        //lectura y parseo del body
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath,router)
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: ',this.port);
        });
    }
}
