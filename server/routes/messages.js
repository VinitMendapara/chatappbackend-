import express from 'express'
import { async } from 'regenerator-runtime'
import Message from "../models/message"

const router = express.Router()

router.get("/", async (req, res) => {
    const {from_user, to_user} = req.query
    if (!from_user || !to_user) {
      return res.status(406).send({status: "Data is Malformed"})
    }

    const messages = await Message.find({
      $and: [
        {from_user: [from_user, to_user]},
        {to_user: [from_user, to_user]}
      ]
    })
    return res.status(200).send({status: "success", data: messages})
})

// post event
// router.post("/send", async (req, res) => {
//   const {message, to_user, from_user} = req.body
//   await Message.create({message, from_user, to_user})
//   return res.status(200).send({status: "success"})
// })

module.exports = router
