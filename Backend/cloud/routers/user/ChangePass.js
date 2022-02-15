import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const ChangePass = express.Router();
ChangePass.get( 
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            Parse.User.enableUnsafeCurrentUser()
            await Parse.User.become(req.query.token)
            const user = Parse.User.current()

            const currentpass = req.query.curpassword;
            const newpass = req.query.newpassword;

            try {
                const check_user = await Parse.User.logIn(user.attributes.username, currentpass);
                user.setPassword(newpass);
                user.save(null, {useMasterKey:true})
                res.send(JSON.stringify({"response": "successful"}))   
            } catch (error) {
                res.send(JSON.stringify({"response": "failed password is not correct"}))   
            }

        } catch (error) {
            res.send(JSON.stringify({ "error": error.message}))
        }
    })
)

export default ChangePass;