import Express from 'express'
import router from './router'
import db from './config/db'
import cors,{CorsOptions} from 'cors'

const server = Express()

//Funcion para conectar la base de datos
async function conectarBD(){
    try {
        await db.authenticate()
        db.sync()
        console.log('Conectado a BD exitosamente')
    } catch (error) {
        console.log(error)
    }
}
//Inicia la funcion para conectar a la base de datos
conectarBD()


//Cors

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

//Habilita para poder crear archivos
server.use(Express.json())

//Indiica que las rutas deben comenzar por api y direccionandolas al router
server.use('/api',router)

export default server