import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const DeleteFromCart = express.Router();

DeleteFromCart.get(
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
                res.send(JSON.stringify( {"response" : "cart didn't existed try to add a new one!"}))
            }
            else {
                try{
                    let product_list = cart.attributes.productsList;
                    const index = product_list.indexOf(req.query.id);
                    if (index > -1){

                        product_list.splice(index, 1);
                        cart.set("productsList", product_list)
                        cart.save(null, { useMasterKey: true });
                        res.send(JSON.stringify( {"response" : "deleted successfuly!"}))
                        return
                    }
                    res.send(JSON.stringify( {"response" : "This book didn't exist in your cart!"}))
                }
                catch {
                    res.send(JSON.stringify( {"response" : "This book didn't exist in your cart!"}))
                }
            }
            
        } catch (error) {
            res.send(JSON.stringify( {"error" : error}))
        }
    })
)

export default DeleteFromCart;