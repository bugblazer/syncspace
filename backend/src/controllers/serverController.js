const prisma = require("../lib/prisma");
const { generateInviteToken } = require("../lib/inviteToken");

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

async function getServer(req, res) {
    const serverId = req.params.id;

    try {
        const server = await prisma.server.findUnique({
            where: {
                id: serverId
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })

        if(!server) {
            return res.status(404).json({
                error: "Server not found"
            });
        }

        return res.status(200).json({
            server
        });
    }  catch(error) {
        console.error("Error getting server:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

async function createInvite(req, res) {
    const serverId = req.params.id;
    const userId = req.user.id;

    try {
        const membership = await prisma.member.findUnique({
            where: {
                userId_serverId: {
                    userId,
                    serverId
                }
            }
        });

        if(!membership) {
            return res.status(403).json({
                error: "You're not a member of this server"
            });
        }

        if(membership.role !== "OWNER") {
            return res.status(403).json({
                error: "Only server owner can create invites"
            });
        }

        const token = generateInviteToken();

        const invite = await prisma.invite.create({
            data: {
                token,
                serverId
            }
        });

        return res.status(201).json({
            message: "Invite created successfully",
            invite: {
                token: invite.token
            }
        });
    } catch(error) {
        console.error("Error creating invite:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

async function joinServer(req, res) {
    const { token } = req.params;
    const userId = req.user.id;

    try {
        const invite = await prisma.invite.findUnique({
            where: {
                token: token
            }
        });

        if(!invite) {
            return res.status(404).json({
                error: "Invite not found"
            });
        }

        const server = await prisma.server.findUnique({
            where: {
                id: invite.serverId
            }
        });

        if(!server) {
            return res.status(404).json({
                error: "Server not found"
            });
        }

        const existingMember = await prisma.member.findUnique({
            where: {
                userId_serverId: {
                    userId,
                    serverId: invite.serverId
                }
            }
        });

        if(existingMember) {
            return res.status(409).json({
                error: "You are already a member of this server"
            });
        }

        await prisma.member.create({
            data: {
                userId,
                serverId: invite.serverId,
                role: "MEMBER"
            }
        });

        return res.status(201).json({
            message: "Joined server successfully",
            server: {
                id: server.id,
                name: server.name
            }
        });
    } catch(error) {
        console.error("Error joining the server:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = {
    createServer,
    getServer,
    createInvite,
    joinServer
};