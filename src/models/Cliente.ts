import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript'
import Arriendo from './Arriendo'

@Table({tableName:'clientes'})
class Cliente extends Model{
    @Column({
        type:DataType.STRING(10),
        primaryKey:true,
        allowNull:false,
        field:'rut_cliente'
    })
    declare rutCliente:string
    @Column({
        type:DataType.STRING(50),
        field:'nom_cliente'
    })
    declare nomCliente:string

    @HasMany(()=>Arriendo)
    declare cliente:Arriendo[]

}

export default Cliente