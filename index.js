import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/index'
const app = express()

dotenv.config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', router)

app.get('*', (req, res) => {
  res.json({
    message: 'Endpoint Does not exist'
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening on port ${port}`)
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  console.log('Database connection successful')
})
