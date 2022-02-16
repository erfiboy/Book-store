import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Cart from '../../models/cart.js'

const AddToCart = express.Router();

AddToCart.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            Parse.User.enableUnsafeCurrentUser()
            await Parse.User.become(req.query.token)
            const user = Parse.User.current()
            console.log("user id = ", user.id)
            
            const cart_query = new Parse.Query("Cart");
            cart_query.equalTo("userId", user.id);
            const cart = (await cart_query.first({useMasterKey: true}));
            console.log("here and cart is :", cart)

            if (cart === undefined) {
                const request = req.query
                Parse.User.enableUnsafeCurrentUser()
                await Parse.User.become(request.token)
                const user = Parse.User.current();

                const cart = new Cart();
                cart.set("userId", user.id);
                const product_list = []

                for (let i = 0; i < request.number; i++){
                    product_list.push(request.id);

                }
                
                cart.set("productsList", product_list);
                cart.save(null, { useMasterKey: true });
                res.send(JSON.stringify( {"response" : "created successfuly!"}))
            }
            else {
                const request = req.query
                let product_list = cart.attributes.productsList;
                product_list.push(request.id)
                console.log(product_list)
                cart.set("productsList", product_list)
                cart.save(null, { useMasterKey: true });
                
                res.send(JSON.stringify( {"response" : "added successfuly!"}))
            }
            
        } catch (error) {
            res.send(JSON.stringify( {"error" : error}))
        }
    })
)

export default AddToCart;