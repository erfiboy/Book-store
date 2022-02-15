import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Login = express.Router();
Login.get( 
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const user = await Parse.User.logIn(req.query.username, req.query.password);
            res.send(JSON.stringify({"token" : user.getSessionToken()}))
        } catch (error) {
            res.send(JSON.stringify({ "error": error}))
        }
    })
)

export default Login;