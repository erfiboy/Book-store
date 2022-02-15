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
            if (req.body.iamge){
                product.set("price", req.body.price);
                ParseFile parseFile = ParseFile(file, name: "image.png", debug: true);
            var fileResponse = await parseFile.save();
            if (fileResponse.success) {
                parseFile = fileResponse.result as ParseFile;
                print(parseFile.toString());
                print("Upload with success");
            } else {
                print("Upload with failed");
            }
            }
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a image" })
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