const express = require('express')
const session = require('express-session')
require('dotenv').config()
const cors = require('cors')
const redis = require('redis')
const connectRedis = require('connect-redis')
const path = require('path') 
const sequelize = require('./db/db')
const redisClient = require('./db/redis')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
app.use(errorHandler)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    const token = redisClient.get("key1", (err, reply) => console.log(reply))
    token()
    app.listen(PORT, () => {
      console.log('[OK] Server has been started on port', PORT, '...')
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()
