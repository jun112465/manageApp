let express = require('express');
let router = express.Router();

let home = require('router/home');
router.use('/', home)