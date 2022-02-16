import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../../models/category.js'

const CategoryCreate = express.Router();

CategoryCreate.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const query = new Parse.Query("Category");
            query.equalTo("name", req.query.name);
            var category = (await query.first({ useMasterKey: true }));

            if (category === undefined) {
                category = new Category();
                category.set("name", req.query.name);
                await category.save(null, { useMasterKey: true })
            }

            res.send(JSON.stringify({"status": "ok"}))

        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default CategoryCreate;