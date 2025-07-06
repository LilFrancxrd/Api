import { Column, DataType, ForeignKey, HasMany, Model, Table,BelongsTo } from "sequelize-typescript";
import Arriendo from "./Arriendo";
import Categoria from "./Categoria";

@Table({tableName:'productos'})
class Producto extends Model{
    @Column({
        type:DataType.STRING(6),
        primaryKey:true,
        allowNull:false,
        field:'patente_vehiculo'
    })
    declare patenteVehiculo:string

    @Column({
        type:DataType.STRING(20),
        field:'marca_vehiculo'
    })
    declare marcaVehiculo:string
    @Column({
        type:DataType.STRING(20),
        field:'modelo_vehiculo'
    })
    declare modeloVehiculo:string

    @Column({
        type:DataType.INTEGER,
        field:'año_vehiculo'
    })
    declare añoVehiculo:number

    @Column({
        type:DataType.STRING(10),
        field:'id_categoria'
    })
    @ForeignKey(()=>Categoria)
    declare idCategoria:string
    
    @BelongsTo(()=> Categoria)
    declare categoria:Categoria

}
export default Producto