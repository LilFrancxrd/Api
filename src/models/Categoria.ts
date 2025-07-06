import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Producto from "./Producto";

@Table({tableName:'categorias'})
class Categoria extends Model{
    @Column({
        type:DataType.STRING(10),
        primaryKey:true,
        allowNull:false,
        field:'id_categoria'
    })
    declare idCategoria:string
    @Column({
        type:DataType.STRING(50),
        field:'nom_categoria'
    })
    declare nomCategoria:string
    @HasMany(()=>Producto)
    declare producto:Producto[]
}
export default Categoria