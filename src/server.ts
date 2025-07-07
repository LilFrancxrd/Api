import Express from 'express'
import router from './router'
import db from './config/db'
import cors,{CorsOptions} from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const server = Express()
const PORT = process.env.PORT || 5000;

const CorsOptions:CorsOptions={
    origin:function(origin,callback){
        if(!origin || origin===process.env.FRONTEND_URL){
            callback(null,true)
        }else{
            callback(new Error('Error de CORS'),false)
        }
    }
}

server.use(cors(CorsOptions))

server.use(Express.json())

server.use('/api',router)


//Funcion para conectar la base de datos
async function conectarBD(){
    try {
        await db.authenticate()
        console.log('Conexion a BD exitosa')

        await db.sync({alter:true})
        console.log('Modelo sincornizado con la base de datos')

        server.listen(PORT, ()=>{
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

conectarBD()




export default server