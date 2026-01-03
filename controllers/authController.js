const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Survey, Response } = require('../models');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        //history
        const surveyCount = await Survey.count({ where: { userId: user.id } });
        const responseCount = await Response.count({ where: { userId: user.id } });
        const hasHistory = surveyCount > 0 || responseCount > 0;

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email },
            hasHistory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
