const User = require("./User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function createTokenAndSetCookie(res, userId, secretKey, expiration) {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: expiration });
    res.cookie('jwt', token, { httpOnly: true });
    return token;
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }
        const user = await User.create({ name, email, password });
        const userId = user._id; // Adjust this to your actual user ID retrieval
        const token = createTokenAndSetCookie(res, userId, process.env.JWT_SECRET, '7d');
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const userId = user._id; // Adjust this to your actual user ID retrieval

        const token = createTokenAndSetCookie(res, userId, process.env.JWT_SECRET, '7d');

        console.log(res.cookie);
        res.status(200).json({ message: 'Login successful', token });



    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}