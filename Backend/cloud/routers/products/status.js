import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Status = express.Router();

Status.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const id = req.query.id
            let query = new Parse.Query("Product");
            const product =  (await query.equalTo("objectId", id).first({ useMasterKey: true })).attributes;

            const response = {
                "id": product.id,
                "name": product.name,
                "author": product.author,
                "price": product.price,
                "is_available" : product.is_available,
                "category" : product.category,
                "publisher" : product.publisher,
                "summary" : product.summary,
                "description" : product.description,
            }
            const result = {"response" : response}
            res.send(JSON.stringify(result))
        } catch (error) {
            res.send(JSON.stringify({"error": error.message}))
        }
    })
)

export default Status;