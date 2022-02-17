import express, { response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const CategoryList = express.Router();

CategoryList.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const id = req.query.id
            const query = new Parse.Query("Category");
            const category = (await query.find({ useMasterKey: true }))
            let response = [];
            category.forEach(element =>{
                response.push({
                    "name": element.attributes.name,
                    "image": element.attributes.image_tag
                })
            })

            res.send(JSON.stringify(response))

        } catch (error) {
            res.send(JSON.stringify({ "error": error}))
        }
    })
)

export default CategoryList;