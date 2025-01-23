const {signup,login,logout}=require('../controllers/authController')
const router=require('express').Router();

router.post('/create-account',signup)
router.post('/login',login)
router.post('/logout',logout)


module.exports=router;