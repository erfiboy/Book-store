import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const GetCart = express.Router();

GetCart.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            Parse.User.enableUnsafeCurrentUser()
            await Parse.User.become(req.query.token)
            const user = Parse.User.current()
            
            const cart_query = new Parse.Query("Cart");
            cart_query.equalTo("userId", user.id);
            const cart = (await cart_query.first({useMasterKey: true}));

            if (cart === undefined) {
                res.send(JSON.stringify( {"response" : []}))
            }
            else {
                const products =  cart.attributes.productsList
                const numbers  =  cart.attributes.numberList
                let response = [];
                let i = 0;
                products.forEach(async element => {
                    console.log(element)
                    const query = new Parse.Query("Product");
                    query.equalTo("objectId", element);
                    const book = await query.first({ useMasterKey: true })
                    console.log(book)
                    response.push({
                        "id": book.id,
                        "name": book.attributes.name,
                        "author": book.attributes.author,
                        "price": book.attributes.price,
                        "is_available" : book.attributes.is_available,
                        "publisher" : book.attributes.publisher,
                        "number" : numbers[i],
                    })
                    i = i+1;
                    if ( i == products.length){
                        res.send(JSON.stringify( {"number": products.length, "response" : response}))
                    }
                });
            }
        } catch (error) {
            res.send(JSON.stringify( {"error" : error}))
        }
    })
)

export default GetCart;