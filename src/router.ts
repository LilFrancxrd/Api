import {Router} from 'express'
import { borrarCategoria, crearCategoria, editarCategoria, getCategoriaConCantidadProductos, getCategoriaConSusProductos, getCategorias } from './handlers/categorias'
import { borrarProducto, crearProducto, editarProducto, getProductoByCodigo } from './handlers/productos'
import { crearUsuario, login } from './handlers/usuarios'
import { verificarToken } from './middleware/verificarToken'
//import { newRental } from './handlers/arriendos'



const router = Router()

router.post('/login',login)
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

//USUARIO

//ARRIENDO
//router.post('/arriendos',newRental)

export default router