const prisma = require("../lib/prisma");

async function userController(req, res) {
    const id = req.user.id;

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    if(!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
    });
}

module.exports = userController;