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

            if (req.query.number == 0) {
                if (cart === undefined) {
                    res.send(JSON.stringify( {"error" : "try to add none zero numbers of books"}))
                    return
                }
                else {
                    let product_list = cart.attributes.productsList;
                    let number_list = cart.attributes.numberList;
                    console.log(product_list, number_list)
                    const index = product_list.indexOf(req.query.id);
                    if (index > -1){
                        product_list.splice(index, 1);
                        cart.set("productsList", product_list)
                        
                        number_list.splice(index, 1);
                        cart.set("number_list", number_list)
                        cart.save(null, { useMasterKey: true });

                        res.send(JSON.stringify( {"response" : "deleted successfuly!"}))
                        return
                    }
                }
            }

            if (cart === undefined) {
                const request = req.query
                Parse.User.enableUnsafeCurrentUser()
                await Parse.User.become(request.token)
                const user = Parse.User.current();

                const cart = new Cart();
                cart.set("userId", user.id);

                const product_list = [];
                product_list.push(request.id);
                cart.set("productsList", product_list);
                
                const number_list = [];
                number_list.push(parseInt(request.number));
                cart.set("numberList", number_list);
                console.log("number : ", request.number)

                cart.save(null, { useMasterKey: true });
                res.send(JSON.stringify( {"response" : "created successfuly!"}))
            }
            else {
                const request = req.query
                console.log(cart.attributes)
                let product_list = cart.attributes.productsList;
                let number_list = cart.attributes.numberList;
                
                const index = product_list.indexOf(request.id);
                console.log("id is:" , request.id)
                if (index > -1){
                    number_list[index] = parseInt(request.number);
                    cart.set("numberList", number_list);
                }
                else {
                    product_list.push(request.id);
                    cart.set("productsList", product_list);

                    number_list.push(parseInt(request.number));
                    cart.set("numberList", number_list);
                }
                cart.save(null, { useMasterKey: true });
                res.send(JSON.stringify( {"response" : "added successfuly!"}))
                return
            }
            
        } catch (error) {
            res.send(JSON.stringify( {"error" : error}))
        }
    })
)

export default AddToCart;