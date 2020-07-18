import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
  console.log('logging')
  next()
}

app.get('/data', log, (req, res) => {
  res.send({ data: [1, 2, 3, 4, 5]})
})

app.post('/data', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})
export const start = () => {
  app.listen(3000, () => {
    console.log('sever is running')
  })
}
