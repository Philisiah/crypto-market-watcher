import express from 'express';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

export default router;
