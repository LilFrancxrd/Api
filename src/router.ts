import {Router} from 'express'
import { borrarCategoria, crearCategoria, editarCategoria, getCategoriaConCantidadProductos, getCategoriaConSusProductos, getCategorias } from './handlers/categorias'
import { borrarProducto, crearProducto, editarProducto, getProductoByCodigo } from './handlers/productos'
import { actualizarPassword, crearUsuario, login, logout } from './handlers/usuarios'
import { verificarToken } from './middleware/verificarToken'
import { arriendoActivo, arriendoTerminado, borrarArriendo, crearArriendo, registrarDevolucion } from './handlers/arriendos'
import { crearCliente } from './handlers/clientes'
//import { newRental } from './handlers/arriendos'



const router = Router()

router.post('/login',login)
router.post('/logout',logout)
router.post('/usuarios/crear',crearUsuario)

//MIDDLEWARE

//router.use(verificarToken)



//CATEGORIAS
router.get('/categorias',getCategorias)
router.get('/categorias/con-cantidad-productos',getCategoriaConCantidadProductos)
router.get('/categorias/:id',getCategoriaConSusProductos)
router.post('/categorias', crearCategoria)
router.put('/categorias/:id',editarCategoria)
router.delete('/categorias/:id',borrarCategoria)


//PRODUCTOS
router.get('/productos/:id' , getProductoByCodigo)
router.post('/productos',crearProducto)
router.put('/productos/:id',editarProducto)
router.delete('/productos/:id',borrarProducto)


//USUARIOS

router.put("/actualizarpass/:id",actualizarPassword)


//ARRIENDO
router.post("/arriendo/crear",crearArriendo)
router.put("/arriendo/:id" ,registrarDevolucion )
router.delete("/arriendo/:id",borrarArriendo)
router.get("/arriendo/activos",arriendoActivo)
router.get("/arriendo/terminados",arriendoTerminado)
//CLIENTE

router.post("/cliente/crear",crearCliente)
export default router