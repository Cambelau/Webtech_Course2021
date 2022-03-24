const express = require('express')
const path = require('path')
const router = require('../lib/router')

const config = {
  port: 3000
}

const app = express()
app.set('views', path.resolve(__dirname,'..') + "/views")
app.set('view engine', 'ejs')

app.use(router)

app.listen(config.port, () => {
 console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})
