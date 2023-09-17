const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDB");
dotenv.config();
const bodyParser = require("body-parser")
const transactionModel = require("./models/transactionModel")
const moment = require("moment");
const path = require("path");


//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin : "http://localhost:3000"
}));
 
app.use(bodyParser.urlencoded({ extended: true }));


//routes
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));

//getall transections
app.post("/api/v1/transections/get-transaction", async(req, res) => {
   
    try{
        const {frequency,selectedDate,type} = req.body;
        const transactions = await transactionModel.find({
            ...(frequency !== "custom" ? {
                 date:{
                $gt : moment().subtract(Number(frequency),'d').toDate()
            }, 
            }:{
                date:{
                    $gte: selectedDate[0],
                    $lte :selectedDate[1],
                }

            }),
            userid: req.body.userid,
            ...(type !== "all" && { type }),
        });
        res.status(200).json(transactions);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error)

    }
})

// treasaction routes
const transRouter = require("./routes/transactionRoute")
app.use("/api/v1/trasanctions", transRouter);


//static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req,res)
{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})



//port
const PORT = 8080 || process.env.PORT;

app.listen(
    PORT,()=>
    {
        console.log("Server Runinng on 8080 port")
    }
)



