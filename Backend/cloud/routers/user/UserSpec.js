import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const UserSpec = express.Router();
UserSpec.get( 
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            Parse.User.enableUnsafeCurrentUser()
            await Parse.User.become(req.query.token)
            const user = Parse.User.current()

            const firstname = user.attributes.firstname;
            const lastname = user.attributes.lastname;
            const email = user.attributes.email;

            const response = { "firstname" : firstname, "lastname" : lastname, "email": email} 
            res.send(JSON.stringify(response))   
            
        } catch (error) {
            res.send(JSON.stringify({ "error": error.message}))
        }
    })
)

export default UserSpec;