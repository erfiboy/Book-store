import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Logout = express.Router();
Logout.get( 
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            await Parse.User.logOut();
        } catch (error) {
            res.send(JSON.stringify({ "error": error.message}))
        }
    })
)

export default Logout;