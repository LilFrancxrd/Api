import { Request , Response } from "express";
import Cliente from "../models/Cliente";

export const crearCliente = async(request:Request , response: Response)=>{
    const {rut_cliente , nom_cliente} = request.body

    try {
        const existe = await Cliente.findByPk(rut_cliente)
    
        if(existe){
            const nuevoCliente = await Cliente.create({rut_cliente, nom_cliente})
            response.status(201).json({message:"Cliente Creado"})
        }
        
    } catch (error) {
        console.error('Error al registrar usuario',error)
        response.status(500).json({error:'Error'})
    }
}