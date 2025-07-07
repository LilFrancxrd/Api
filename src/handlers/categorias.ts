import {Sequelize } from "sequelize-typescript"
import Categoria from "../models/Categoria"
import {Request , response, Response} from 'express'
import Producto from "../models/Producto"


export const getCategorias = async(request:Request,response:Response)=>{
    const categorias = await Categoria.findAll(request.body)
    response.json({data:categorias})
}

export const getCategoriaConCantidadProductos = async (request: Request, response: Response) => {
  try {
    const cantidadProducto = await Categoria.findAll({
      attributes: [
        'id_categoria',
        'nom_categoria',
        [Sequelize.fn('COUNT', Sequelize.col('productos.patente_vehiculo')), 'cantidadVehiculos']
      ],
      include: [{
        model: Producto,
        as:'productos',
        attributes: []
      }],
      group: ['Categoria.id_categoria','Categoria.nom_categoria'],
      order: [['nom_categoria', 'ASC']],
    });

    response.json({ data: cantidadProducto });
  } catch (error: any) {
    console.error('Error al consultar', error);
    response.status(500).json({ error: error.message });
  }
};



export const getCategoriaConSusProductos = async(request:Request,response:Response)=>{
    try {
        const {id} = request.params
        const categoriaBuscada = await Categoria.findByPk(id,{
            attributes:['nomCategoria'],
            include:[
                {
                    model:Producto,
                    required:false,
                    attributes:['marcaVehiculo','modeloVehiculo']
                }
            ],

        })
        response.json({data:categoriaBuscada})
    } catch (error) {
        console.error('Error al consultar',error);
        response.status(500).json({error: error.message})
    }
}



export const crearCategoria = async(request:Request , response:Response)=>{
    try {        
        const categoriaNueva = await Categoria.create(request.body)
        response.json({data:categoriaNueva})
    } catch (error) {
        console.error('Error al consultar',error);
        response.status(500).json({error: error.message})
    }
}

export const editarCategoria = async(request:Request , response:Response)=>{
    try {
        const {id} = request.params
        const categoria = await Categoria.findByPk(id)
        await categoria.update(request.body)
        await categoria.save()
        response.json({data:categoria})
    } catch (error) {
        console.error('Error al consultar',error);
        response.status(500).json({error: error.message})
    }
}
export const borrarCategoria = async(request:Request , response:Response)=>{
    try {
        const {id} = request.params
        const categoriaBorrada  = await Categoria.findByPk(id)
        await categoriaBorrada.destroy(request.body)
        await categoriaBorrada.save()
        response.json({data:'Categoria Borrada'})
    } catch (error) {
        console.error('Error al consultar',error);
        response.status(500).json({error: error.message})
    }
}

