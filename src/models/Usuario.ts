import {Column, DataType, Table, Model, Validate, IsEmail, BeforeCreate} from 'sequelize-typescript'
import bcrypt from 'bcrypt'

@Table({tableName:'usuarios'})
class Usuario extends Model{
    @Column({
        type:DataType.STRING(50),
        primaryKey:true,
        allowNull:false,
        field:'email_usuario',
        validate:{isEmail:true}
    })
    declare email:string
    @Column({
        type:DataType.STRING(50),
        allowNull:false,
        field:'password_usuario'
    })
    declare password:string;

    @BeforeCreate
    static async hashPassword(usuario:Usuario){
        usuario.password = await bcrypt.hash(usuario.password,10)
    }

}

export default Usuario