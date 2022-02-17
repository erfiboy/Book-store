import multer  from 'multer'
import express from 'express'
import Author from '../../models/author.js'
import expressAsyncHandler from 'express-async-handler';

const AuthorCreate = express.Router();

var upload = multer({ dest: 'uploads/author/'});
var type = upload.single('image');

AuthorCreate.post(
    '/', type,
    expressAsyncHandler( async (req,res) => {
        try {

            if (!req.body.name){
                res.send(JSON.stringify({"error": "author must have a name"}))
            }

            Parse.User.enableUnsafeCurrentUser()
            await Parse.User.become(req.body.token)
            const user = Parse.User.current()


            let query = new Parse.Query("_Role");
            query.equalTo("users", user);
            var role = (await query.first({ useMasterKey: true }));
            console.log(role)
            if (role == undefined || role.attributes.name != "Admin"){
                res.send({"error" : "user must have admin privileges"})
                return
            }

            query = new Parse.Query("Author");
            query.equalTo("name", req.body.name);
            var author = (await query.first({ useMasterKey: true }));

            if (author === undefined) {
                author = new Author();
                author.set("name", req.body.name);
            }
            
            if (req.file) {
                author.set("image_tag", "uploads/author/" + req.file.filename);
            }
            
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a image" })
                return
            }

            await author.save(null, { useMasterKey: true })
            
            res.send(JSON.stringify({"status": "ok"}))

        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default AuthorCreate;