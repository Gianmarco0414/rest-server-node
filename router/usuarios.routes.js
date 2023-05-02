import { Router, response } from "express";
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controller/usuarios.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { emailExiste, esRoleValido, existeUsuarioById } from "../helpers/db-validators.js";

const router=Router();

router.get('/',usuariosGet)

router.put('/:id',[
    check('id','No es un ID valido').isInt(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuariosPut)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost)

router.delete('/:id',[
    check('id','No es un ID valido').isInt(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuariosDelete)
router.patch('/',usuariosPatch)

export {router}