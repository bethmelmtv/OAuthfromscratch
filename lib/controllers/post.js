const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const createNewPost = await Post.createPost();
      res.json(createNewPost);
    } catch (error) {
      next(error);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getPosts();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  });
