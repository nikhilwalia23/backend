const { User } = require("../models/users");
const jwt = require("jsonwebtoken")
const sgMail = require('@sendgrid/mail');
var singUp = (req, res) => {
    //Check Before Creating User
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ "error": "Action Failed" }).status(400);
        }
        else {
            return res.status(200).json({ "message": "User Account Created" }).status(200);
        }
    });
}
var login = (req, res) => {
    const email = req.body.email;
    const ps = req.body.password;
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.json(err).status(400);
        }
        else if (!user) {
            return res.status(404).json({ "error": "User Does not Account" });
        }
        else {
            const { name, number, role } = user;
            const id = user._id;
            if (user.authenticate(ps)) {
                jwt.sign({ id }, process.env.HASHING_KEY, (err, token) => {
                    if (err) {
                        return res.status(404).json({ "error": "Unable To login" });
                    }
                    else {
                        res.cookie("token", token, { path: ["http://localhost:3001/api/", "https://touristbackend.herokuapp.com/api"], httpOnly: true })
                        return res.status(200).json({ id, name, role });
                    }
                });
            }
            else {
                return res.status(404).json({ "error": "UserId and Password Does not Matach" });
            }
        }
    })
}
var isLogin = (req, res, next) => {
    if (req.cookies['token'] == undefined) {
        return res.status(400).json({ "error": "Token must be provided" });
    }
    const token = req.cookies['token'];
    jwt.verify(token, process.env.HASHING_KEY, (err, curr) => {
        if (err) {
            return res.send(err);
        }
        else {
            if (curr.id == req.body.id) {
                next();
            }
            else {
                res.status(401).json({ "error": "Acess Denied" });
            }
        }
    });
}
var isEmploye = (req, res, next) => {
    const id = req.body.id;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(400).json(err);
        }
        else {
            if (user.role == 1) {
                next();
            }
            else {
                return res.status(403).json({ "error": "You are not eligible for this operation" });
            }
        }
    });
}
var welcome = (req, res) => {

    res.send("you are logged in");
}
let forgetPassword = (req, res) => {
    const email = req.body.email;
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user) {
            return res.status(404).json({ "error": "email does not exist" });
        }
        else {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
                to: email,
                from: process.env.EMAIL_FROM, // Use the email address or domain you verified above
                subject: 'Reset Password',
                text: 'working fine now send resetlink',
                html: '<strong>working reset fom page</strong>',
            };

            sgMail
                .send(msg)
                .then(() => { return res.status(200).json({"message":"working fine"});}, error => {
                    console.error(error);

                    if (error.response) {
                        console.error(error.response.body)
                    }
                });

        }
    });
}
module.exports = { singUp, login, isLogin, welcome, isEmploye, forgetPassword };