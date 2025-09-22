const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB   

mongoose.connect(process.env.MONGO_URI);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);      
        if (isPasswordValid) {
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.post('/register', async (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});