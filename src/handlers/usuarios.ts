
import { Request, Response } from "express"
import Usuario from "../models/Usuario"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Sequelize } from "sequelize"

export const login = async(request:Request,response:Response)=>{
    const {email,password} = request.body
    const SECRET = process.env.SECRET_KEY
    
    try {
        
        const usuario = await Usuario.findByPk(email)
        console.log("Usuario encontrado:", usuario);
        if(usuario || bcrypt.compareSync(password, usuario.password)){
            const token = jwt.sign({email: usuario.email}, SECRET, {expiresIn: '1h'})
            response.json({token})
            
        }
        response.status(401).json({error:'Error'})
    }catch (error) {
        console.error('Error de login: ', error)
        response.status(500).json({error: 'Error interno'})
    }
}


export const logout = async(request:Request , response:Response)=>{
    try {
        response.status(200).json({message:'Sesion cerrada'})
    } catch (error) {
        
    }
}


export const crearUsuario = async(request:Request,response:Response)=>{
    const {email , password} = request.body

    if(!email || !password){
        response.status(400).json({error:'Email y contraseña son obligatorias'})
    }

    try {
        const existe = await Usuario.findByPk(email)
        if(existe){
            response.status(409).json({error:'Email ya registrado'})
        }
        
        const nuevoUsuario = await Usuario.create({email,password})

        response.status(201).json({message:'Usuario Creado'})

    } catch (error) {
        console.error('Error al registrar usuario',error)
        response.status(500).json({error:'Error'})
    }
    
}


export const actualizarPassword = async(request:Request , response:Response)=>{
    const {id} = request.params

    const {passActual , passNueva , passConfirmarNueva} = request.body

    //Verificar campo en blanco
    if(!passActual || !passNueva || !passConfirmarNueva){
        response.status(400).json({error:'Los campos son obligatorios'})
    }

    //Validar que las password sean igualse

    if(passNueva !== passConfirmarNueva){
        response.status(400).json({error:'Contraseñas no coinciden'})
    }

    //Validar el minimo de caracteres
    if(passNueva.length <6){
        response.status(400).json({error:'Minimo 6 caracteres'})
    }


    try {
        const usuario = await Usuario.findByPk(id)
    
        if(!usuario){
            response.status(404).json({error:'Usuario no encontrado'})
        }
    
        const passCorrecta = await bcrypt.compare(passActual , usuario.password)
    

    
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(passNueva,salt)
    
        await usuario.save()
    
        response.status(200).json({message:'Contraseña Actualizada'})
        
    } catch (error) {
        console.error('Error al registrar usuario',error)
        response.status(500).json({error:'Error'})
    }
}