import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Post = new Schema({
  url: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  likers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  liked: { type: Boolean, required: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  style: { type: String, required: true }
})

export default mongoose.model('Post', Post)
