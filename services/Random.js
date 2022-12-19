function randomNumbers(cantidad) {
  let arrayNumbers = []

  for (let i = 0; i < cantidad; i++) {
    let randomNumber = Math.floor(Math.random() * 1001)
    arrayNumbers.push(randomNumber)
  }

  let countArrayNumbers = {}
  arrayNumbers.forEach((element) => {
    countArrayNumbers[element] = (countArrayNumbers[element] || 0) + 1
  })
  return countArrayNumbers
}
// CHILD PROCESS
/* process.on('message', (message) => {
  let { cantidad } = message
  const countArrayNumbersObj = randomNumbers(cantidad)
  process.send(countArrayNumbersObj)
})
 */

module.exports = { randomNumbers }
