import multer  from 'multer'
import express from 'express';
import Category from '../../models/category.js'
import expressAsyncHandler from 'express-async-handler';

const CategoryCreate = express.Router();

var upload = multer({ dest: 'uploads/category/'});
var type = upload.single('image');

CategoryCreate.post(
    '/',type,
    expressAsyncHandler( async (req,res) => {
        try {
            if (!req.body.name){
                res.send(JSON.stringify({"error": "category must have a name"}))
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

            query = new Parse.Query("Category");
            query.equalTo("name", req.body.name);
            var category = (await query.first({ useMasterKey: true }));
            

            if (category === undefined) {
                category = new Category();
                category.set("name", req.body.name);
            }
            
            if (req.file) {
                category.set("image_tag", "uploads/category/" + req.file.filename);
            }

            else {
                res.statusCode = 500
                res.send({ "error": "book must have a image" })
                return
            }

            await category.save(null, { useMasterKey: true })

            res.send(JSON.stringify({"status": "ok"}))

        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default CategoryCreate;