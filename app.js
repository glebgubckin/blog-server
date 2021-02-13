const express = require('express') 
require('dotenv').config()
const cors = require('cors') 
const path = require('path' ) 
const errorHandler = require('./middleware/ErrorHandlerMiddleware') 
const sequelize = require('./db/db')
const models = require('./models/models')
const router = require('./routes/index')

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
    app.listen(PORT, () => {
      console.log('[OK] Server has been started on port', PORT, '...')
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()
