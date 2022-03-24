const express = require('express')
const db = require('./db')

const router = express.Router()

// Home page
router.get('/', (req, res) => {
  res.render('home.ejs')
})

// List of channels
router.get('/channels', async (req, res) => {
  const data = await db.list()
  res.render('channels.ejs', {data: data})
})

// Channel information
router.get('/channel/:id', async (req, res) => {
  const channel = await db.get(req.params.id)
  if (channel)
    res.render('channel.ejs', channel)
  else
    res.status(404).render('404.ejs')
})

module.exports = router
