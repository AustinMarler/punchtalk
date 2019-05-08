const express = require('express');
const router = express.Router();
const conn = require('../db')
const config = require('config')
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')

router.post('/register-user', (req, res, next) => {
  const username = req.body.username
  const password = sha512(req.body.password + config.get('salt'))
  
  const checksql = `
  SELECT profile_image, count(1) as count
  FROM users
  WHERE username = ?
  GROUP BY id
  `

  conn.query(checksql, [username], (err, results, fields) => {
    const count = results[0].count
    const profileImage = results[0].profile_image

    if (count > 0) {
      res.status(409).json({
        error: "Username already taken"
      })
    } else {
      const sql = "INSERT INTO users (username, password) VALUES (?, ?)"

      conn.query(sql, [username, password], (err, results, fields) => {
        if (err) {
          throw new Error("register failed")
        } else {
          const token = jwt.sign({ username, profileImage }, config.get("secret"))
          res.json({
            token: token
          })
        }
      })
    }
  })
})

router.post('/user-login', (req, res, next) => {
  const username = req.body.username
  const password = sha512(req.body.password + config.get('salt'))

  const sql = `
  SELECT profile_image, count(1) as count
  FROM users
  WHERE username = ? AND password = ?
  GROUP BY id
  `

  conn.query(sql, [username, password], (err, results, fields) => {
    const count = results[0].count
    const profileImage = results[0].profile_image

    if (count >= 1) {
      const token = jwt.sign({ username, profileImage }, config.get('secret'))
      res.json({
        token
      })
    } else {
      res.status(401).json({
        message: 'Invalid username or password'
      })
    }
  })
})

module.exports = router;