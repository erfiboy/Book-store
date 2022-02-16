import express, { response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const AuthorList = express.Router();

AuthorList.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const query = new Parse.Query("Author");
            const authors = (await query.find({ useMasterKey: true }))
            let response = [];
            authors.forEach(element =>{
                response.push({
                    "name": element.attributes.name,
                })
            })

            res.send(JSON.stringify(response))

        } catch (error) {
            res.send(JSON.stringify({ "error": error}))
        }
    })
)

export default AuthorList;