require('dotenv').config()
const mongoose = require('mongoose')
const UsuariosModel = require('../models/UsuariosModel.js')
const UtilsSession = require('./UtilsSession.js')
const mongodbUrl = process.env.MONGODBATLAS;


module.exports = class SessionService {
  constructor() {
    this.url = mongodbUrl
    this.mongodb = mongoose.connect
  }

  //funciones
  async conectarDB() {
    await this.mongodb(this.url)
  }

  async buscarUsuarioPorEmail(email) {
    await this.conectarDB()
    const usuario = await UsuariosModel.findOne({ email })
    return usuario
  }

  async registrarUsuario(usuario) {
    await this.conectarDB()
    const userExist = await UsuariosModel.findOne({ email: usuario.email })
    if (userExist) return false
    usuario.password = UtilsSession.createHash(usuario.password)
    const newUser = new UsuariosModel(usuario)
    await newUser.save()
    return true
  }
}
