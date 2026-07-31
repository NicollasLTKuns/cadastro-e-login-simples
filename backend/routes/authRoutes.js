const express = require("express");

const router = express.Router();

router.get("/teste", (req, res) => {
    res.json({
        mensagem: "AuthRoutes funcionando!"
    });
});

module.exports = router;