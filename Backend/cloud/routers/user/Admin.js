
import User from '../../models/user.js'


const CreateAdmin = async () =>
{
    try{

        let query = new Parse.Query("_User");
        query.equalTo("username", "admin");
        var user = (await query.first({ useMasterKey: true }));
        if (user != undefined){
            return true
        }
        
        user = new User();
        user.set("username", "admin");
        user.set("password", "admin");
        await user.signUp();
        query = new Parse.Query("_Role");
        query.equalTo("name", "Admin");
        var role = (await query.first({ useMasterKey: true }));
        role.getUsers().add(user);
        await role.save()
        return true
    }
    catch (error) {
        console.log({"error": error})
    }
}

export default CreateAdmin;