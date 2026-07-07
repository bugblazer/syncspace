const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
    const {username, email, password} = req.body;
    console.log(username, email);
    
    if(!username || !email || !password || username.trim() === "" || email.trim() === "" || password.trim() === "") {
        return res.status(400).json({
            message: "All fields are required!"
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(existingUser) {
        return res.status(409).json({
            message: "A user is already registered on this email address!"
        })
    }
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: hashedPassword,
        }
    })

    res.status(201).json({
        message: "User registered successfully!"
    });
}

module.exports = {
    registerUser
};