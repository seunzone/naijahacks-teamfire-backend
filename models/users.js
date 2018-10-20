import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  likes: { type: Number, required: true, default: 0 },
  location: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  coverPhoto: { type: String, required: true }
})

export default mongoose.model('User', User)
