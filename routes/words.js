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

/* GET word by label. */
router.get('/:label', async (req, res, next) => {
  try {
    const all = await words.getWord(req.params.label)
    res.json(all)
  } catch (error) {
    next(error)
  }
})

/* POST a new word. */
router.post('/', function (req, res) {
  try {
    words.addWord(req.query)
    res.status(201).json({
      message: 'Word added'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
