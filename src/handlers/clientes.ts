import { Request , Response } from "express";
import Cliente from "../models/Cliente";

export const crearCliente = async(request:Request , response: Response)=>{
    const {rut , nom} = request.body

    try {
        const existe = await Cliente.findByPk(rut)
    
        if(existe){
            const nuevoCliente = await Cliente.create({rutCliente:rut, nomCliente:nom})
            response.status(201).json({message:"Cliente Creado"})
        }
        
    } catch (error) {
        console.error('Error al registrar cliente',error)
        response.status(500).json({error:'Error'})
    }
}  