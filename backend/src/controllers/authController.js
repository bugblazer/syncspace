const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
    ) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(409).json({
                error: "A user is already registered on this email address"
            });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
            }
        });

        return res.status(201).json({
            message: "User registered successfully"
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (
        !email ||
        !password ||
        email.trim() === "" ||
        password.trim() === ""
    ) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!existingUser) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const payload = {
            id: existingUser.id
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = {
    registerUser,
    loginUser
};