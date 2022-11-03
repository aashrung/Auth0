const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js")
const mw = require("../middlewares/auth.js")


router.post("/user/createUser", userController.createUser)

router.post("/user/loginUser", userController.loginUser)

router.get("/user/getUser/:userId", mw.authentication, userController.getUser)

router.delete("/user/logout", mw.authentication, userController.getUser)


//====================================  Invalid API  ==========================================//
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you requested is not available!"
    })
})
module.exports = router;