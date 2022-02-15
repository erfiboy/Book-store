import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/product.js'
import FindOrCreate from '../category/findOrCreate.js'

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

            if (req.body.author)
                product.set("author", req.body.author);
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a author" })
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
                const id = await FindOrCreate(req.body.category)
                console.log(" id in product is ", id)
                product.set("category", id);
            }
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a category" })
                return
            }

            product.save(null, { useMasterKey: true })

            res.send(JSON.stringify({ "status": "ok" }))

        } catch (error) {
            res.send(JSON.stringify({ "error": error}))
        }
    })
)

export default CreateProduct;