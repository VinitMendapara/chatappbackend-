import express from 'express'
import User from "../models/user"
import { async } from 'regenerator-runtime'

const router = express.Router()

/* GET users listing. */
router.post('/register', async (req, res, next) => {

  const {username, password} = req.body
  if (!username || !password) {
    return res.status(406).send({status: "Username and password are mandatory for registration"})
  }

  const matching_user = await User.find({username})
  if (matching_user.length > 0) {
    return res.status(401).send({status: `User ${username} is already registered`})
  }

  const user_info = new User({username, password})
  const resp = await user_info.save()
  return res.status(201).send({status: "success", id: resp._id, username})
})

router.post("/login", async (req, res) => {
  const {username, password} = req.body

  if (!username || !password) {
    return res.status(406).send({status: "Username and password are mandatory for login"})
  }

  const matching_user = await User.find({username, password})
  if (matching_user.length == 0) {
    return res.status(401).send({status: "Username or password is incorrect"})
  } else {
    const id = matching_user[0]["_id"]
    return res.status(200).send({status: "success", id, username})
  }

})

router.get("/list", async (req, res) => {
  const users = await User.find().select({password: 0, __v: 0}).sort({username: "asc"})
  return res.status(200).send({status: "success", data: users})
})

module.exports = router;
