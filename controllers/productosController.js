const express = require('express')
const router = express.Router()
const Contenedor = require('../services/Contenedor.js')
const io = require('../server.js')
// Utilizacion de Logger Pino para log de error
const serviceLoggerPino = require('../services/LoggerPino.js')

const productos = new Contenedor()
router.get('/listar', async (req, res) => {
  res.json(await productos.getAll())
})

router.get('/listar/:id', async (req, res) => {
  let { id } = req.params
  if (await productos.getById(id)) {
    res.json(await productos.getById(id))
  } else {
    const error = `No existe el producto con ID ${id}`
    serviceLoggerPino.errorFound(error)
    res.json(error)
  }
})

router.post('/guardar', (req, res) => {
  let producto = req.body
  productos.save(producto)
  refreshProducts()
  res.redirect('/main')
})

router.put('/actualizar/:id', (req, res) => {
  let { id } = req.params
  let producto = req.body
  productos.updateItem(producto, id)
  refreshProducts()
  res.json(producto)
})

router.delete('/borrar/:id', async (req, res) => {
  let { id } = req.params
  let producto = await productos.deleteById(id)
  refreshProducts()
  res.json(producto)
})

// Refresh products
async function refreshProducts() {
  io.sockets.emit('lista-productos', await productos.getAll())
}

io.on('connection', async () => {
  io.sockets.emit('lista-productos', await productos.getAll())
})

module.exports = router
