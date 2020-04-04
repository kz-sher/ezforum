const express = require('express');
const passport = require('passport')
const router = express.Router();

const PostController = require('../controllers/post.controller')
const { handlePassportError } = require('../utils/error.helper');
const MulterMiddleware = require('../middleware/multer');
const JwtMiddleware = passport.authenticate("jwt", { 
    session: false,
    failWithError: true
})

router.get("/", JwtMiddleware, PostController.getAllPosts, handlePassportError());
router.get("/profile", JwtMiddleware, PostController.getPostsForUser, handlePassportError());
router.post("/create", [JwtMiddleware, MulterMiddleware], PostController.createPost, handlePassportError());
module.exports = router;