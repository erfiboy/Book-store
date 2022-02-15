import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Login = express.Router();
Login.get( 
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            Parse.User.enableUnsafeCurrentUser()
            let user = await Parse.User.logIn(req.query.username, req.query.password);
            await Parse.User.become(user.getSessionToken())
            user = Parse.User.current()
            res.send(JSON.stringify({"token" : user.getSessionToken()}))
        } catch (error) {
            res.send(JSON.stringify({ "error": error.message}))
        }
    })
)

export default Login;