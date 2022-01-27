const { create , getUsersByUserId , getUsers , updateUsers , deleteUsers , getUserByUserEmail} = require("./user.service");

const { genSaltSync, hashSync ,compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err,results)=> {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUsersByUserId: (req, res) => {
        const id = req.params.id
        getUsersByUserId(id , (err,results)=>{
            if(err) {
                console.log(err)
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success:1,
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err,results)=>{
            if(err) {
                console.log(err)
                return;
            }
            return res.json({
                success:1,
                data: results
            })
        })
    },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUsers(body, (err,results)=> {
            if (err) {
                console.log(err);
                return
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update"
                })
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            })
        })
    },
    deleteUsers: (req,res) =>{
        const body = req.body;
        deleteUsers(body, (err,results) =>{
            if(err) {
                console.log(err)
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success:1,
                message: "User deleted successfully"
            })
        })
    },
    login :(req,res) =>{
        const body = req.body
        console.log("body",body)
        getUserByUserEmail(body.email, (err,results)  =>{
            if(err) {
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    data: "InValid Email and Password"
                })
            }
            const result = compareSync(body.password, results.password);

            if(result) {
                results.password = undefined;
                const jsonwebtoken = sign({result: results},'qwe1234',{
                    expiresIn: '1h'
                })
                return res.json({
                    success:1,
                    message: "login successfully",
                    token: jsonwebtoken
                })
            }else {
                return res.json({
                    success: 0,
                    data: 'Invalid Email and password'
                })
            }
        })
    }
}