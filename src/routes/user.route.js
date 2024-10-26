const {registerUser,loginUser,forgotPassword,verifyOtp,setNewPassword}=require('../controller/user.controller.js')
const {checkEmailSet,checkOtpSet}=require('../middleware/ForgotPasswordAuth.middleware.js');
const express=require('express')
const router=express.Router()


router.all('/register',(req,res)=>{
    if(req.method=='POST'){
    registerUser(req,res)
    }
    else if(req.method=='GET'){
        res.render('user/register',{error:""})
    }
})
router.all('/login',(req,res)=>{
    if(req.method=='POST'){
    loginUser(req,res)
    }
    else if(req.method=='GET'){
        res.render('user/login',{error:""})
    }
})

router.route('/forgot-password')
    .get((req, res) => {
        res.render('user/forgotpassword', { error: "" });
    })
    .post((req, res) => {
        forgotPassword(req, res);
    });

router.route('/verify-otp')
    .get(checkEmailSet,(req, res) => {
        const email = req.cookies.emailResetPassword;
        res.render('user/verifyOtppage', { error: "", Email: email || "" });
    })
    .post((req, res) => {
        verifyOtp(req, res);
    });

router.route('/set-new-password')
    .get(checkOtpSet,(req, res) => {
        const email = req.cookies.emailResetPassword;
        res.render('user/setnewpassword', { error: "", Email: email || "" });
    })
    .post((req, res) => {
        setNewPassword(req, res);
    });

router.all('/main',(req,res)=>{
    if(req.method=='GET'){
        res.render('main')
    }
})

module.exports=router