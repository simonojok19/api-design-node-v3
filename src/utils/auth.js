import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
    try {
        const user = await User.create(req.body)
        const token = newToken(user)
        res.send({ token })
    } catch (e) {
        console.log(e)
        res.status(400).end()
    }
}

export const signin = async (req, res) => {}

export const protect = async (req, res, next) => {
  next()
}
