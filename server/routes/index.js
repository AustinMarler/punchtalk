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

router.patch('/change-profile-image', (req, res, next) => {
  const profile_image = req.body.profile_image
  const username = req.body.username

  const sql = `
  UPDATE users
  SET profile_image = ?
  WHERE username = ?
  `

  conn.query(sql, [profile_image, username], (err, results, fields) => {
    if (err) {
      throw new Error('profile image change failed')
    } else {
      const token = jwt.sign({ username, profile_image }, config.get('secret'))
      res.json({
        token
      })
    }
  })
})

router.patch('/change-password', (req, res, next) => {
  const username = req.body.username
  const currentPassword = sha512(req.body.currentPassword + config.get('salt'))
  const newPassword = sha512(req.body.newPassword + config.get('salt'))

  const sql = `
  SELECT count(1) as count
  FROM users
  WHERE username = ? AND password = ?
  `

  conn.query(sql, [username, currentPassword], (err, results, fields) => {
    const count = results[0].count

    if (count >= 1) {
      const sql = `
      UPDATE users
      SET password = ?
      WHERE username = ?
      `

      conn.query(sql, [newPassword, username], (err, results, fields) => {
        if (err) {
          throw new Error('password change failed')
        } else {
          res.json({
            message: 'Password change success'
          })
        }
      })
    } else {
      res.status(401).json({
        message: 'Incorrect password'
      })
    }
  })
})

module.exports = router;