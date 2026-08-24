const prisma = require("../lib/prisma");

async function createServer(req, res) {
    const { name } = req.body;

    if(!name || name.trim() === "") {
        return res.status(400).json({
            error: "Server name is required"
        });
    }

    const userId = req.user.id;

    try{
        const server = await prisma.server.create({
            data: {
                name: name.trim(),
                members: {
                    create: {
                        userId: userId,
                        role: "OWNER"
                    }
                }
            }
        });

        return res.status(201).json({
            message: "Server created successfuly",
            server: {
                id: server.id,
                name: server.name
            }
        });
    } catch(error) {
        console.error("Error creating server:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = {
    createServer
};