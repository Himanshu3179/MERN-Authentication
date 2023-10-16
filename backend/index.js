require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
const connectDb = require('./db');
connectDb();
const router = require("./routes");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/user", router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});