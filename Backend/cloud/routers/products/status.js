import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Status = express.Router();

Status.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const id = req.query.id
            let query = new Parse.Query("Product");
            const product =  (await query.equalTo("objectId", id).first({ useMasterKey: true }));

            query = new Parse.Query("PriceChange");
            query.descending("createdAt")
            const pricechange =  (await query.equalTo("product", product.id).find({ useMasterKey: true }));
            
            const price_response = []
            console.log(pricechange)
            pricechange.forEach(element => {
                price_response.push({
                    "price": element.attributes.price,
                    "is_available":  element.attributes.is_available
                })
            });

            const response = {
                "id": product.attributes.id,
                "name": product.attributes.name,
                "author": product.attributes.author,
                "price": product.attributes.price,
                "is_available" : product.attributes.is_available,
                "category" : product.attributes.category,
                "publisher" : product.attributes.publisher,
                "summary" : product.attributes.summary,
                "description" : product.attributes.description,
            }
            const result = {"response" : response, "price_response" : price_response}
            res.send(JSON.stringify(result))
        } catch (error) {
            res.send(JSON.stringify({"error": error.message}))
        }
    })
)

export default Status;