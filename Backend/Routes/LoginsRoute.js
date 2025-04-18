import express from 'express';
import User from '../Models/UserLoginModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/signup", async (request, response) => {
    try {
        const { username, password } = request.body;

        if (!username || !password) {
            return response.status(400).json({ error: "Username and password are required" });
        }

        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return response.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        response.status(201).json({
            message: "User created successfully",
            user: {
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        response.status(500).json({ error: "Registration failed. Please try again." });
    }
});

router.post("/login", async (request, response) => {
    try {
        const { username, password } = request.body;

        if (!username || !password) {
            return response.status(400).json({ error: "Username and password are required" });
        } 

        const user = await User.findOne({ username: username });

        if (!user) {
            return response.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ error: "Invalid credentials" });
        }

        response.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        response.status(500).json({ error: "Login failed. Please try again." });
    }
});

router.get('/', async (request, response) => {
    try {
        const users = await User.find({}, { password: 0 });
        response.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        response.status(500).json({ error: "Failed to fetch users" });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return response.status(404).json({ error: "User not found in Database" });
        }
        
        response.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        response.status(500).json({ error: "Error deleting User Profile" });
    }
});

export default router;