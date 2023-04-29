import { response,request } from "express"
const usuariosGet=(req=request,res=response)=>{
    const {q,id}=req.query;
    res.json({
        msg:'get Api - controlador',
        q,
        id
    })
}

const usuariosPut=(req=request,res=response)=>{
    const {id}=req.params
    res.json({
        msg:'put Api - controlador',
        id
    })
}

const usuariosPost=(req=request,res=response)=>{
    const {nombre,edad}=req.body
    res.json({
        msg:'post Api - controlador',
        nombre,
        edad
    })
}

const usuariosDelete=(req,res=response)=>{
    res.json({
        msg:'delete Api - controlador'
    })
}

const usuariosPatch=(req,res=response)=>{
    res.json({
        msg:'patch Api - controlador'
    })
}

export {usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch}