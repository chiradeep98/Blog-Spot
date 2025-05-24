const mongoose = require('mongoose');
const express = require('express');
const { handlerSignup, postHandlerSignup, handlerSignin, postHandlerSignin } = require('../controller/handler');

const userRouter = express.Router();

userRouter.get('/signup', handlerSignup);

userRouter.post('/signup', postHandlerSignup);

userRouter.get('/signin', handlerSignin);

userRouter.post('/signin', postHandlerSignin);



module.exports = userRouter;