const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

class AuthController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Create new user
            const userId = await User.create({ username, email, password });
            const user = await User.findById(userId);

            // Generate token
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            res.status(201).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: 'Error registering user' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            // Remove password from response
            const { password: _, ...userWithoutPassword } = user;

            res.json({ user: userWithoutPassword, token });
        } catch (error) {
            res.status(500).json({ error: 'Error logging in' });
        }
    }

    static async getProfile(req, res) {
        try {
            const { password: _, ...userWithoutPassword } = req.user;
            res.json(userWithoutPassword);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching profile' });
        }
    }
}

module.exports = AuthController; 