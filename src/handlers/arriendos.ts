import { Request, Response } from "express"
import Producto from "../models/Producto"
import Cliente from "../models/Cliente"
import Arriendo from "../models/Arriendo"
import Usuario from "../models/Usuario"

export const crearArriendo = async(request:Request , response:Response)=>{
    const {patente, tipoVehiculo ,rutCliente, nomCliente} = request.body

    if(!patente || !rutCliente || !tipoVehiculo || !nomCliente){
        response.status(400).json({error:'Campos son obligatorios'})
    }
    try {
        const existe = await Producto.findByPk(patente)
        const nuevoUsuario = await Arriendo.create({
            patenteVehiculo:patente,
            rutCliente:rutCliente,
            tipoVehiculo:tipoVehiculo,
            nomCliente:nomCliente})
        if(existe){
            response.status(201).json({message:'Arriendo creado'})
        }
    } catch (error) {
        console.error('Error al registrar usuario arriendo',error)
        response.status(500).json({error:'Error'})
    }

}


export const registrarDevolucion = async(request:Request , response:Response)=>{
    const {id} = request.params
    
    try {
        const arriendo = await Arriendo.findByPk(id)

        if(!arriendo){
            response.status(404).json({error:'No existe arriendo'})
        }

        if(arriendo.estadoArriendo !=='activo' && arriendo.estadoArriendo !=='pendiente'){
            response.status(400).json({error:'No puede generar deolucion'})
        }

        arriendo.fechaFin = new Date();
        arriendo.estadoArriendo='terminado'

        await arriendo.save()

        response.status(200).json({message:"Devolucion registrada"})
    } catch (error) {
        console.error('Error devolucion')
        response.status(500).json({error:'Error del servidor'})
    }
}

export const borrarArriendo =  async(request:Request , response:Response)=>{
    const {id} = request.params
    try {
        const arriendoaBorrar =  await Arriendo.findByPk(id);

        
        if(!arriendoaBorrar){
            response.status(404).json({error:'Arriendo no encontrado'})
        }

        await arriendoaBorrar.destroy(request.body)
        await arriendoaBorrar.save()
        response.json({data:'Arriendo Borrado'})
    } catch (error) {
        console.error('Error al consultar',error);
        response.status(500).json({error: error.message})
    }
}

export const arriendoActivo = async(request:Request , response:Response)=>{
    try {
        const activo = await Arriendo.findAll({
            where:{
                estadoArriendo:'activo'
            }
        })


        if(arriendoActivo.length === 0){
            response.status(200).json({message:'No hay arriendos activos'})
        }

        response.status(200).json({message:'Arriendos activos: ' , data:activo})
    } catch (error) {
        
    }
}


export const arriendoTerminado = async(request:Request , response:Response)=>{
    try{
        const terminado = await Arriendo.findAll({
            where:{
                estadoArriendo:'terminado'
            }
        })

        if(terminado.length === 0){
            response.status(200).json({message:"No hay arriendos terminados"})
        }

        response.status(200).json({message:'Arriendos terminados: ' ,data:terminado})
    }catch(error){

    }
}