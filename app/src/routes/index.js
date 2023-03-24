const { Router } = require("express");

const router = Router();

router.use("/books", require("./book.routes"))

module.exports = router;