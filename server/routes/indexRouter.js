const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('index server is good')
})

module.exports = router