const transactionModel = require("../models/transactionModel")

exports.deleteTransaction = async (req, res) => {
    try {
      await transactionModel.findOneAndDelete({ _id: req.body.transacationId });
      res.status(200).send("Transaction Deleted!");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };


exports.editTransaction = async (req, res) => {
    try {
        console.log(req.body);
    
        // Assuming you are using Mongoose, you can use findByIdAndUpdate
        const updatedTransaction = await transactionModel.findByIdAndUpdate(
          req.body.transactionId, // Correct the typo in "transactionId"
          req.body.payload,
          { new: true } // This option returns the updated document
        );
    
        if (!updatedTransaction) {
          return res.status(404).json({ message: 'Transaction not found' });
        }
    
        res.status(200).json({ message: 'Edit successfully', updatedTransaction });
      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }
  };

exports.addTransaction = async (req,res) =>
{
    console.log("addTransaction called!!")
    try{
           const newTransaction  = new transactionModel(req.body);
           await newTransaction.save();
           res.status(200).send('Transaction Created')
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error)

    }
      
}


