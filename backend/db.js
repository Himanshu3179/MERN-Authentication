const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('Connected to Database'));
}

module.exports = connectDb;

