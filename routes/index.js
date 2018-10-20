import express from 'express'
import usersController from '../controllers/usersController'
import postsController from '../controllers/postsController'
import loginRequired from '../middleware/loginRequired'
const router = express.Router()

router.post('/auth/signup', usersController.createAccount)
router.post('/auth/signin', usersController.signIn)
router.get('/users/:username', usersController.getUser)
router.put('/users/update', loginRequired, usersController.updateUser)
router.post('/posts/new', loginRequired, postsController.createPost)
router.put('/posts/:postId/react', loginRequired, postsController.likePost)
router.get('/posts', postsController.getAllPosts)

export default router
