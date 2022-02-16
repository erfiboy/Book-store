import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Author from '../../models/author.js'

const AuthorCreate = express.Router();

AuthorCreate.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const query = new Parse.Query("Author");
            query.equalTo("name", req.query.name);
            var author = (await query.first({ useMasterKey: true }));

            if (author === undefined) {
                author = new Author();
                author.set("name", req.query.name);
                await author.save(null, { useMasterKey: true })
            }

            res.send(JSON.stringify({"status": "ok"}))

        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default AuthorCreate;