import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import api from './configserver.js'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import ParseDashboard from 'parse-dashboard'
import CreateAdmin from './cloud/routers/user/Admin.js'

import Cart from './cloud/routers/user/Cart.js'
import Login from './cloud/routers/user/Login.js'
import Logout from './cloud/routers/user/Logout.js'
import SignUp from './cloud/routers/user/Signup.js'
import GetCart from './cloud/routers/user/GetCart.js'
import UserSpec from './cloud/routers/user/UserSpec.js'
import AddToCart from './cloud/routers/user/AddToCart.js'
import ChangePass from './cloud/routers/user/ChangePass.js'
import DeleteFromCart from './cloud/routers/user/DeleteFromCart.js'

import List from './cloud/routers/products/list.js'
import Status from './cloud/routers/products/status.js'
import CreateProduct from './cloud/routers/products/create.js'

import CategoryList from './cloud/routers/category/list.js'
import CategoryCreate from './cloud/routers/category/create.js'

import AuthorList from './cloud/routers/author/list.js'
import AuthorCreate from './cloud/routers/author/create.js'

const app = express();
dotenv.config(); // Loads environment variables from .env file

const BookStoreDashboard = () => {
    var options = { allowInsecureHTTP: true };

    var dashboard = new ParseDashboard(
        {
            apps: [
                {
                    serverURL: process.env.PARSE_SERVER_URL,
                    appId: process.env.PARSE_APP_ID,
                    masterKey: process.env.PARSE_MASTER_KEY,
                    appName: process.env.APP_NAME,
                },
            ],
            users: [
                {
                    user: process.env.DASHBOARD_ADMIN,
                    pass: process.env.DASHBOARD_PASS,
                },
            ],
        },
        options
        );
        
    app.use(process.env.DASHBOARD_PATH, dashboard);
}

const DefineRoles = async ()  => {
    try{
        const query = new Parse.Query("_Role");
        query.equalTo("name", "Admin");
        var role = (await query.first({ useMasterKey: true }));
        console.log("role", role)
        if (role != undefined){
            return
        }

        const guest_role = new Parse.ACL();
        const guest = new Parse.Role("Guest", guest_role);
        guest.save();
        
        const authenticated_role = new Parse.ACL();
        authenticated_role.setPublicReadAccess(true);
        const authenticated = new Parse.Role("Authenticated", authenticated_role);
        authenticated.save();
        
        const Admin_roles = new Parse.ACL();
        Admin_roles.setPublicWriteAccess(true);
        Admin_roles.setPublicReadAccess(true);
        const admin = new Parse.Role("Admin", Admin_roles);
        admin.save();
    }
    catch{
        console.log("roles were defined before!")
    }
}

const listen = () => {
    let httpServer = createServer(app);
    httpServer.listen(process.env.PARSE_PORT, () => console.log(`backend running on port ${process.env.PARSE_PORT}.`));
}

const routes = () => {
    app.use(process.env.SERVER_PATH, api);
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public')); 
    app.use('/uploads', express.static('uploads'));
    
    app.use('/signup', SignUp);
    app.use('/login', Login);
    app.use('/logout', Logout);
    app.use('/cart', Cart);
    app.use('/get-cart', GetCart);
    app.use('/user-spec', UserSpec);
    app.use('/change-pass', ChangePass);
    app.use('/add-cart', AddToCart);
    app.use('/delete-cart', DeleteFromCart);
    
    app.use('/status', Status);
    app.use('/list', List);
    app.use('/create', CreateProduct);
    
    app.use('/category/list', CategoryList);
    app.use('/category/create', CategoryCreate);
    
    app.use('/author/list', AuthorList);
    app.use('/author/create', AuthorCreate);
}

const start = async () => {
    BookStoreDashboard();
    routes();
    listen();
    await DefineRoles();
    await CreateAdmin();
} 

start();