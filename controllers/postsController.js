import User from '../models/users'
import Post from '../models/posts'

exports.createPost = async (req, res) => {
  try {
    const { body } = req
    const user = await User.findById(req.user._id)
    if (user) {
      const newPost = new Post(body)
      newPost.owner = req.user._id
      const savedPost = await newPost.save()
      user.posts.push(savedPost._id)
      const savedUser = user.save()
      if (savedPost && savedUser) {
        res.json({
          success: true,
          post: savedPost
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

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    const owner = await User.findById(post.owner)
    if (post) {
      const likers = post.likers
      // check if the logged in user has already liked the post
      const userHasAlreadyLikedPost = likers.indexOf(req.user._id)
      if (!(userHasAlreadyLikedPost > -1)) {
        // user has not liked the post
        post.likers.push(req.user._id)
        post.likes += 1
        owner.likes += 1
        const savedPost = await post.save()
        const savedOwner = await owner.save()
        if (savedPost && savedOwner) {
          res.json({
            success: true,
            liked: true,
            owner: savedOwner,
            post: savedPost
          })
        }
      } else {
        post.likers.splice(userHasAlreadyLikedPost, 1)
        post.likes += -1
        owner.likes += -1
        const savedPost = await post.save()
        const savedOwner = await owner.save()
        if (savedPost && savedOwner) {
          res.json({
            success: true,
            owner: savedOwner,
            post: savedPost,
            unliked: true
          })
        }
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: 'owner', select: '-password' })
      .exec()
    if (posts) {
      res.json({
        success: true,
        posts: posts
      })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}
