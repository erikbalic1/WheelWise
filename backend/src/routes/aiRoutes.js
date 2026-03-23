const express = require('express');
const { getCarAdvice } = require('../controllers/aiController');

const router = express.Router();

router.post('/recommend', getCarAdvice);

module.exports = router;
