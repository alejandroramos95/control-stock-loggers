// router import
const express = require('express')
const router = express.Router()
//const { fork } = require('child_process')
//const child = fork('./services/Random.js')
const serviceRandom = require('../services/Random.js')

router.get('/randoms', (req, res) => {
  const cant = req.query.cant ? req.query.cant : 100000000
  res.send(serviceRandom.randomNumbers(cant))
  /* child.send({ cantidad: cant })
  child.on('message', (countArrayNumbersObj) => {
    res.send(countArrayNumbersObj)
  }) */
})

// router export
module.exports = router
