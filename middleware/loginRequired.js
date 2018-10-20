import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const loginRequired = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token =
    req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Please Login First.' })
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        req.user = decoded
        next()
      }
    })
  } else {
    res.json({
      message: 'Unauthorized!, you have to login first'
    })
  }
}

export default loginRequired
