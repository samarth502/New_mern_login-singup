const express  = require('express');
const { singupUser, loginUser } = require('../Controller/auth-controller');
const verifyToken = require('../middleware/verifyToken');
const { getUser } = require('../Controller/user-controller');

const router = express.Router();

router.post('/singup' , singupUser).post('/login' ,loginUser).get('/user',verifyToken,getUser)

exports.router = router;