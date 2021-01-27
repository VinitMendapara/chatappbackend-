import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        from_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        to_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

export default Message