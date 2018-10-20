import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/users'

exports.createAccount = async (req, res) => {
  try {
    let body = req.body
    body.username = body.username.toLowerCase()
    body.password = body.password.toLowerCase()
    body.email = body.email.toLowerCase()
    let existingUsername = await User.findOne({ username: body.username })
    let existingEmail = await User.findOne({ email: body.email })
    if (!body || !body.username || !body.password || !body.email) {
      res.json({
        success: false,
        message: 'Please fill in all required fields!'
      })
    } else if (
      !validator.isEmail(body.email) ||
      !validator.isAlphanumeric(body.username)
    ) {
      res.json({
        success: false,
        message: 'Please fill in all fields with valid inputs'
      })
    } else if (existingUsername || existingEmail) {
      res.json({
        success: false,
        message: 'User already exists!'
      })
    } else {
      const newUser = new User(body)
      newUser.profilePhoto =
        'https://res.cloudinary.com/trend-x/image/upload/v1534202811/default_user_pic_vnertr.png'
      newUser.coverPhoto =
        'https://images.pexels.com/photos/237432/pexels-photo-237432.jpeg?cs=srgb&dl=boutique-bridal-bridal-fashion-237432.jpg'
      newUser.password = await bcrypt.hash(body.password, 10)
      const savedUser = await newUser.save()
      if (savedUser) {
        const payload = {
          _id: savedUser._id,
          username: savedUser.username,
          profilePhoto: savedUser.profilePhoto,
          coverPhoto: savedUser.coverPhoto
        }
        const token = await jwt.sign(payload, process.env.secret)
        res.json({
          success: true,
          message: 'Signup successful!',
          token: token,
          user: payload
        })
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

exports.signIn = async (req, res) => {
  try {
    let body = req.body
    const user = await User.findOne({
      username: body.username.toLowerCase()
    })
    if (user) {
      if (bcrypt.compareSync(body.password.toLowerCase(), user.password)) {
        body._id = user._id
        body.profilePhoto = user.profilePhoto
        user.password = undefined
        const token = await jwt.sign(body, process.env.secret)
        res.status(200).json({
          token: token,
          _id: user._id,
          user: user,
          message: 'Sign in successful!',
          success: true
        })
      } else {
        res.json({
          message: 'Invalid login details!',
          success: false
        })
      }
    } else {
      res.json({
        message: 'User does not exist!',
        success: false
      })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('posts').exec()
    if (user) {
      user.password = undefined
      res.json({
        success: true,
        user: user
      })
    } else {
      res.json({
        success: false,
        message: 'User not found.'
      })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { body } = req
    const user = await User.findByIdAndUpdate(req.user._id, body, {
      new: true
    })
    if (user) {
      user.password = undefined
      res.json({
        success: true,
        user: user
      })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}
