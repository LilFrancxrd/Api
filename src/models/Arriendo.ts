import {  BelongsTo, Column, DataType, ForeignKey, Table,Model } from "sequelize-typescript";
import Producto from "./Producto";
import Cliente from "./Cliente";

@Table({tableName:'arriendos', timestamps:true})
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
        allowNull:false,
        defaultValue:DataType.NOW,
        field:"fecha_inicio"
    })
    declare fechaInicio:Date

    @Column({
        type:DataType.DATE,
        allowNull:true,
        field:'fecha_fin'
    })
    declare fechaFin:Date | null;

//VEHICULO    

    @Column({
        type:DataType.STRING(6),
        allowNull:false,
        //unique:true,
        field:'patente_vehiculo'
    })
    declare patenteVehiculo:string
    
    @Column({
        type: DataType.STRING(20),
        allowNull:false,
        field:'tipo_vehiculo'
    })
    declare tipoVehiculo:string


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

    @Column({
        type:DataType.ENUM('activo','terminado'),
        allowNull:false,
        defaultValue:'activo',
        field:'estado_arriendo'
    })
    declare estadoArriendo: 'activo' | 'terminado' | 'cancelado' | 'pendiente'

    @Column({
        type:DataType.DATE,
        allowNull:true
    })
    declare createdAt: Date

    @Column({
        type:DataType.DATE,
        allowNull:true
    })
    declare updatedAt:Date
}
export default Arriendo