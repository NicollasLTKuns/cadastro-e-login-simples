const express = require("express");
const authController = require("../controllers/authController.js");

const router = express.Router();


router.get("/teste", (req, res) => {
    res.json({
        mensagem: "AuthRoutes funcionando!"
    });
});

router.post("/cadastro", authController.cadastrarUsuario)
router.post("/login", authController.loginUsuario);

module.exports = router;
