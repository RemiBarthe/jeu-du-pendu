const db = require('../db')

module.exports = {
  async getFromLetters(params) {
    return new Promise((resolve, reject) => {
      const letters = params.letters.split(',')
      const positions = params.positions.split(',')

      let query = "SELECT * FROM sys.words WHERE LENGTH(label) = " + params.length
      let previous = { letter: '', position: '' }


      for (i = 0; i < letters.length; i++) {
        if (letters[i] === previous.letter) {
          query += " AND LOCATE('" + letters[i] + "', label, " + (parseInt(previous.position) + 1) + ") = " + positions[i]
        }
        else {
          query += " AND LOCATE('" + letters[i] + "', label) = " + positions[i]
        }

        if (positions[i] != 0 && letters[i] !== letters[i + 1]) {
          query += " AND LOCATE('" + letters[i] + "', label, " + (parseInt(positions[i]) + 1) + ") = " + 0
        }

        previous.letter = letters[i]
        previous.position = positions[i]
      }

      db.query(query + " LIMIT 50", function (err, result) {
        if (err) throw err
        resolve(result)
      })
    })
  },
  async getWord(params) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM sys.words WHERE label = '" + params + "'"
      db.query(query, function (err, result) {
        if (err) throw err
        resolve(result)
      })
    })
  },
  async addWord(params) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO sys.words_to_validate (label) VALUES (?)"
      db.query(query, params.label, function (err, result) {
        if (err) throw err
        resolve(result)
      })
    })
  }
} 