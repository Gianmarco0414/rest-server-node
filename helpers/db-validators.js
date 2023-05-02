import { response } from "express";
import { dbConnection } from "../database/config.data.js";
export const esRoleValido=async(rol='')=>{
    const [roles]=await dbConnection.query('SELECT TRIM(TRAILING ")" FROM substring(COLUMN_TYPE,6)) AS enum_values FROM information_schema.COLUMNS WHERE table_schema = "user_node_cafe" AND TABLE_NAME = "usuario" AND column_name = "rol"');
    const values=roles[0].enum_values;
    let tempString=values.replace(/\'/g,'');
    let finalArray=tempString.split(',');
    const existeRol=finalArray.indexOf(rol);
    if(existeRol==-1){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

export const emailExiste=async(correo='')=>{
    //Verificar si el correo existe
    const [existeEmail]=await dbConnection.query('SELECT * FROM usuario WHERE correo=?',[correo])
    if (existeEmail.length>0){
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

export const existeUsuarioById=async(id)=>{
    const [existeUsuario]=await dbConnection.query('SELECT *FROM usuario WHERE id=?',[id])
    if (existeUsuario==0){
        throw new Error(`El usuario con el id ${id} no existe`)
    }
}