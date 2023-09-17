const mongoose = require("mongoose")
const colors = require("colors");

const connectDb = async () =>
{
    try{
        await mongoose.connect(process.env.MONGO_URL).then(()=>
        {
            console.log(`Server Running on ${mongoose.connection.host}`.bgCyan);
        })
    }
    catch(error){
        console.log(`${error}`.bgRed);
    }

}
module.exports = connectDb;