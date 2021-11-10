const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connection success...`);
    } catch (error) {
        console.log(error);
        throw new Error('Falló al levantar mongodb');
    }
}

module.exports = { dbConnection }


