const express = require('express');
const {handlerHome} = require('../controller/handler');


const router = express.Router();

router.get('/', handlerHome);


module.exports = router;