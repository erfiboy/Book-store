import express from 'express'
import multer  from 'multer'
var upload = multer({ dest: 'uploads/'});
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/product.js'
import PriceChange from '../../models/pricechange.js'
import FindOrCreateCategory from '../category/findOrCreate.js'
import FindOrCreateAuthor from '../author/findOrCreate.js'

const CreateProduct = express.Router();

var type = upload.single('image');

CreateProduct.post(
    '/', type,
    expressAsyncHandler(async (req, res) => {
        try {
            const pricechange = new PriceChange()
   
            let query = new Parse.Query("Product");
            query.equalTo("name", req.body.name);
            query.equalTo("author", req.body.author);
            query.equalTo("publisher", req.body.publisher);
            query.equalTo("category", req.body.category);
            var product = (await query.first({ useMasterKey: true }));

            if (product != undefined){
                pricechange.set("product", product.id)
                pricechange.set("price", req.body.price)
                pricechange.set("is_available", req.body.is_available)
                pricechange.save(null, { useMasterKey: true })
                
                product.set("price", req.body.price)
                product.set("is_available", req.body.is_available)
                product.save(null, { useMasterKey: true })

                res.send(JSON.stringify({ "status": "ok" }))
                return
            }
            
            product = new Product();

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

            if (req.body.publisher)
                product.set("publisher", req.body.publisher);
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a publisher" })
                return
            }
            
            if (req.body.price){
                pricechange.set("price", req.body.price)
                product.set("price", req.body.price);
            }
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a price" })
                return
            }

            if (req.body.is_available){
                pricechange.set("is_available", req.body.is_available)
                product.set("is_available", req.body.is_available);
            }
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

            if (req.file) {
                product.set("image_tag", "uploads/" + req.file.filename);
            }

            else {
                res.statusCode = 500
                res.send({ "error": "book must have a image" })
                return
            }
            
            await product.save(null, { useMasterKey: true })

            query = new Parse.Query("Product");
            query.equalTo("name", req.body.name);
            query.equalTo("author", req.body.author);
            query.equalTo("publisher", req.body.publisher);
            query.equalTo("category", req.body.category);
            var product = (await query.first({ useMasterKey: true }));
            
            pricechange.set("product", product.id)
            pricechange.save(null, { useMasterKey: true })

            res.send(JSON.stringify({ "status": "ok" }))

        } catch (error) {
            res.send(JSON.stringify({ "error": error}))
        }
    })
)

export default CreateProduct;