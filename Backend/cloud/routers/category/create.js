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
            const query = new Parse.Query("Category");
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