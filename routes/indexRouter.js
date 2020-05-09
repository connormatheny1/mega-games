const express = require('express');
const path = require('path')
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

module.exports = router