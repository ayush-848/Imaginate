const signup=require('../controllers/authController')
const router=require('express').Router();

router.post('/create-account',signup)
//router.post('/login',login)


module.exports=router;