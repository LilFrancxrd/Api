import sequelize from "sequelize-typescript"
import {Request, Response} from "express"
import Producto from "../models/Producto"



export const getProductoByCodigo = async(request:Request,response:Response)=>{
    const {id} = request.params
    const productoBuscado = await Producto.findByPk(id)
    response.json({data:productoBuscado})
}

export const crearProducto = async(request:Request,response:Response)=>{
    try {
        const producto = await Producto.create(request.body)
        response.json({data:producto})
    } catch (error) {
        console.error('Error al consultar',error);
        response.status(500).json({error: error.message})
    }    
    
}

export const editarProducto = async(request:Request,response:Response)=>{
    try {
        const {id} = request.params
        const producto = await Producto.findByPk(id)
        await producto.update(request.body)
        await producto.save()
        response.json({data:producto})

    } catch (error) {

        console.error('Error al consultar',error);
        response.status(500).json({error: error.message})
    }    
    
}


export const borrarProducto = async(request:Request,response:Response)=>{
    try {
        const {id} = request.params
        const producto = await Producto.findByPk(id)
        await producto.destroy(request.body)
        await producto.save()
        response.json({data:'Producto Borrado'})

    } catch (error) {

        console.error('Error al consultar',error);
        response.status(500).json({error: error.message})
    }    
    
}
