import express, { query } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../../models/user.js'

const SignUp = express.Router();
SignUp.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        const user = new User();

        if (req.query.username && req.query.password &&
            req.query.email && req.query.email &&
            req.query.firstname && req.query.lastname && req.query.secpassword){
                if (req.query.password == req.query.secpassword){
                    user.set("username", req.query.username);
                    user.set("password", req.query.password);
                    user.set("email", req.query.email);
                    user.set("firstname", req.query.firstname);
                    user.set("lastname", req.query.lastname);
                }
                else {
                    res.send(JSON.stringify({ "error": "passwords not match"}))
                }
            }
        else{
            res.send(JSON.stringify({ "error": "all filds must be filled"}))
            return
        } 
        
        try {
            await user.signUp(); 
            res.send(JSON.stringify({"token" : user.getSessionToken()}))
        } catch (error) {
            res.send(JSON.stringify({ "error": error.message}))
        }
    })
)

export default SignUp;