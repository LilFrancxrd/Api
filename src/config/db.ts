import dotenv from 'dotenv'
import { Dialect} from 'sequelize'
import { Sequelize } from 'sequelize-typescript'


dotenv.config()

const db = new Sequelize({
    dialect:process.env.DB_DIALECT as Dialect,
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT),
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    models:[__dirname + '/../models/**/*.ts'],
    define:{
        timestamps:true

    }
})

export default db
