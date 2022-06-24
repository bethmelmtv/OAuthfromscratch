const { Router } = require('express');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })

  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      res.json({ code });
    } catch (error) {
      next(error);
    }
  });
