import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/product.js'
import FindOrCreateCategory from '../category/findOrCreate.js'
import FindOrCreateAuthor from '../author/findOrCreate.js'

const CreateProduct = express.Router();

CreateProduct.post(
    '/',
    expressAsyncHandler(async (req, res) => {
        try {
            const product = new Product();

            if (req.body.name)
                product.set("name", req.body.name);
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a name" })
                return
            }

            if (req.body.author){
                const name = await FindOrCreateAuthor(req.body.author)
                product.set("author", name);
            }
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a author" })
                return
            }
            console.log(req.body.publisher)
            if (req.body.publisher)
                product.set("publisher", req.body.publisher);
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a publisher" })
                return
            }

            if (req.body.price)
                product.set("price", req.body.price);
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a price" })
                return
            }

            if (req.body.is_available)
                product.set("is_available", req.body.is_available);
            else {
                res.statusCode = 500
                res.send({ "error": "book must set the availability status" })
                return
            }

            if (req.body.category) {
                const name = await FindOrCreateCategory(req.body.category)
                product.set("category", name);
            }
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a category" })
                return
            }
            
            if (req.body.summary) {
                product.set("summary", req.body.summary);
            }
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a summary" })
                return
            }

            if (req.body.description) {
                product.set("description", req.body.description);
            }
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a description" })
                return
            }

            // if (req.body.image) {
            //     let image = new Parse.File()
            //     product.set("image", req.body.image);
            // }
            // else {
            //     res.statusCode = 500
            //     res.send({ "error": "book must have a image" })
            //     return
            // }

            product.save(null, { useMasterKey: true })

            res.send(JSON.stringify({ "status": "ok" }))

        } catch (error) {
            res.send(JSON.stringify({ "error": error}))
        }
    })
)

export default CreateProduct;