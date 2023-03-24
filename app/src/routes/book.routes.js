const { Router } = require("express");
const bookController = require("../controllers/book.controller")

const router = Router();

router.get("/", bookController.findAll);

router.post("/", bookController.create);

router.put("/:id", bookController.update);

router.delete("/:id", bookController.delete);

module.exports = router;
