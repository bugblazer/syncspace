const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const serverController = require("../controllers/serverController");

const router = express.Router();

router.post("/", authMiddleware, serverController.createServer);
router.get("/:id", authMiddleware, serverController.getServer);
router.post("/:id/invite", authMiddleware, serverController.createInvite);
router.post("/join/:token", authMiddleware, serverController.joinServer)

module.exports = router;