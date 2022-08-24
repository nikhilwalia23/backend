const home = (req,res) => 
{
    let data=
    {
        "user_details": "/user/UserId",
        "update_user_details": "/user/UserId",
        "show_packages" : "/package/showpackage",
        "documentation" : "Comming Soon"
    }
    return res.status(200).json(data);
}
module.exports = {home};