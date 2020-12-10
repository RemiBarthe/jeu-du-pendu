const express = require('express')
const router = express.Router()

const words = require('../queries/words')

/* GET words listing. */
router.get('/', async (req, res, next) => {
  try {
    const all = await words.getFromLetters(req.query)
    res.json(all)
  } catch (error) {
    next(error)
  }
})

module.exports = router
