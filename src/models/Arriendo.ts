import {  BelongsTo, Column, DataType, ForeignKey, Table,Model } from "sequelize-typescript";
import Producto from "./Producto";
import Cliente from "./Cliente";

@Table({tableName:'arriendos'})
class Arriendo extends Model{
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        field: 'id_arriendo'
    })
    declare idArriendo:number

    @Column({
        type:DataType.DATE,
        field:"fecha_inicio"
    })
    declare fechaInicio:Date

    @Column({
        type:DataType.DATE,
        field:'fecha_fin'
    })
    declare fechaFin:Date

//VEHICULO    
    
    @Column({
        type: DataType.STRING(20),
        field:'tipo_vehiculo'
    })
    declare tipoVehiculo:string


    @Column({
        type:DataType.STRING(6),
        field:'patente_vehiculo'
    })


//CLIENTE

    @Column({
        type:DataType.STRING(10),
        field:'rut_cliente'
    })
    @ForeignKey(()=>Cliente)
    declare rutCliente:string
    @BelongsTo(()=>Cliente)
    declare cliente:Cliente



    @Column({
        type:DataType.STRING(50),
        field:'nom_cliente'
    })
    declare nomCliente:string


}
export default Arriendo