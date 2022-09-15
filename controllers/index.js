const home = (req,res) => 
{
    let data=
    {
        "user_details": "/user/UserId",
        "Signup_route":"/signup",
        "login":"/login",
        "update_user_details": "/user/UserId",
        "show_packages" : "/package/showpackage",
        "buy_packages": "/package/buypackage",
        "add_package":"/package/add",
        "delete_package":"/package/del",
        "documentation" : "Comming Soon"
    }
    return res.status(200).json(data);
}
module.exports = {home};