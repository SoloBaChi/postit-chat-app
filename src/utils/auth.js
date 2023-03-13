const jsonwebtoken = require('jsonwebtoken')
const User = require('../resources/user/user.model')
const authConfig = require('../config/auth.config')
const generateRandomAvatar = require('../resources/data/generate.avatar')

//create a token
const newToken = (user) => {
  return jsonwebtoken.sign({ id: user.id }, authConfig.secrets.jwt, {
    expiresIn: authConfig.secrets.jwtExpiringDate,
  })
}

//verify token
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, authConfig.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

//create an image tag when a user signs up
const createImageTag = (src, alt) => {
  const imgTag = `<img src = " ${src} " alt = " ${alt} " />`
  return imgTag
}

//signUp a user
exports.signUp = async (req, res) => {
  //if the email or the password does not exist
  if (!req.body.email || !req.body.password) {
    return res.status(404).send({ message: 'need email and password' })
  }

  const user = await User.create(req.body)
  const token = newToken(user)
  const getAvatar = await generateRandomAvatar(user.email)
  user.settings.avatar = getAvatar
  const createdImageTag = createImageTag(getAvatar, user.email)

  return res.status(201).send({ token, user, createdImageTag })
}

//signin a user  , if the user has created an account
exports.signIn = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  const invalidDetails = { message: 'Invalid email or passoword' }

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      'email password'
    )

    if (!user) {
      return res.status(401).send(invalidDetails)
    }

    const match = await user.checkPassword(req.body.password)

    if (!match) {
      return res.status(401).send(invalidDetails)
    }

    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

//protect
exports.protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send({ message: "don't have account" })
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await User.findById(payload.id).select('-password')

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}
