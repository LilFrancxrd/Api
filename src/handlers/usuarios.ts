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