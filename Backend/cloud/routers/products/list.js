import express, { response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const List = express.Router();

List.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const id = req.query.id
            const query = new Parse.Query("Product");

            if (req.query.category){
                query.equalTo("category", req.query.category)
            }
            
            if (req.query.author){
                query.equalTo("author", req.query.author)
            }
            
            // TODO parse save the price as an string
            // if (req.query.pricelt){
            //     console.log("less than", req.query.pricelt)
            //     query.lessThanOrEqualTo("price", parseInt(req.query.pricelt))
            // }
                
            // if (req.query.pricegt){
            //     query.greaterThanOrEqualTo("price", parseInt(req.query.pricegt))
            // }    

            if (req.query.sort){
                if(req.query.sort == "price-")
                query.descending("price")
                else if(req.query.sort == "price")
                query.ascending("price")
                if(req.query.sort == "createdAt-")
                query.descending("createdAt")
                else if(req.query.sort == "createdAt")
                query.ascending("createdAt")
            }
            
            const books = (await query.find({ useMasterKey: true }))
            let response = [];
            books.forEach(element =>{
                response.push({
                    "id": element.id,
                    "name": element.attributes.name,
                    "author": element.attributes.author,
                    "price": element.attributes.price,
                    "is_available" : element.attributes.is_available,
                    "category" : element.attributes.category,
                    "publisher" : element.attributes.publisher,
                    "summary" : element.attributes.summary,
                    "image": element.attributes.image_tag
                })
            })
            const result = {"response" : response}
            res.send(JSON.stringify(result))

        } catch (error) {
            res.send(JSON.stringify({ "error": error}))
        }
    })
)

export default List;