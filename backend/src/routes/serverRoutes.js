const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const serverController = require("../controllers/serverController");

const router = express.Router();

router.post("/", authMiddleware, serverController.createServer);
router.get("/:id", authMiddleware, serverController.getServer);

module.exports = router;