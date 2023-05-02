import { response,request } from "express"
import { dbConnection } from "../database/config.data.js";
import bcrypt from 'bcryptjs';


const usuariosGet=async(req=request,res=response)=>{
    const {limite=5,desde=0}=req.query;
    
    const [[total],[usuarios]]=await Promise.all([
        dbConnection.query('SELECT COUNT(id) AS cantidad FROM usuario WHERE estado=true'),
        dbConnection.query('SELECT *FROM usuario WHERE estado=true LIMIT ?,?',[Number(desde),Number(limite)])
    ])
    res.json({
        total:total[0].cantidad,
        usuarios
    })
}

const usuariosPut=async(req=request,res=response)=>{
    console.log(req.params)
    const {id}=req.params;
    const {nombre,correo,password,rol,estado,img}=req.body;
    let passwordEncriptado=password;
    //Validar con la base de datos
    if(password){
        //Encriptar la contraseña
        const salt=bcrypt.genSaltSync();
        passwordEncriptado=bcrypt.hashSync(password,salt)
    }
    await dbConnection.query('UPDATE usuario SET nombre=?,correo=?,password=?,img=?,rol=?,estado=? WHERE id=?',[nombre,correo,passwordEncriptado,img,rol,estado,id])
    const [rpta]=await dbConnection.query('SELECT id,nombre,correo,rol,estado,google FROM usuario WHERE id=?',[id]);
    res.json(
        rpta[0]
    )
}

const usuariosPost=async(req=request,res=response)=>{
    
    const {nombre,correo,password,rol}=req.body

    
    //Encriptar la contraseña
    let passwordEncriptado=password;
    const salt=bcrypt.genSaltSync();
    passwordEncriptado=bcrypt.hashSync(password,salt)
    
    //Guardar en DB
    const [rows] = await dbConnection.query('INSERT INTO usuario (nombre,correo,password,rol) VALUES (?,?,?,?)',[nombre,correo,passwordEncriptado,rol])

    const [rpta]=await dbConnection.query('SELECT id,nombre,correo,rol,estado,google FROM usuario WHERE id=?',[rows.insertId])
    
    res.json(
        rpta[0]
    )
}

const usuariosDelete=async(req=request,res=response)=>{
    const {id}=req.params;
    await dbConnection.query('UPDATE usuario SET estado=false WHERE id=?',[id])
    const [usuarioEliminado]=await dbConnection.query('SELECT id,nombre,correo,rol,estado,google FROM usuario WHERE id=?',[id])
    res.json({
        usuarioEliminado
    })
}

const usuariosPatch=(req,res=response)=>{
    res.json({
        msg:'patch Api - controlador'
    })
}

export {usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch}