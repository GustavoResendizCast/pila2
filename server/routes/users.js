const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});
// GET//USER//author
router.get('/author', (_, res) => {
  res.render('author', { author: 'Gustavo Resendiz' });
});
module.exports = router;
