const { createUser , getUsersByUserId ,getUsers , updateUsers , deleteUsers  , login} = require("./user.controller");
const router = require("express").Router();

router.post('/',createUser)
router.get("/",getUsers);
router.get("/:id",getUsersByUserId);
router.patch("/",updateUsers);
router.delete("/",deleteUsers)
router.post('/login',login)
module.exports = router