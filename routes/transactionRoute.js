const express = require("express");
const { addTransaction,editTransaction, deleteTransaction } = require("../controllers/transactionCtrl");
 
//router object
const router = express.Router();

//routers

//add transaction POST METHOD
router.post('/add-transaction', addTransaction);

//edit transaction POST METHOD
router.post('/edit-transaction', editTransaction);

//delete transaction POST METHOD
router.post('/delete-transaction', deleteTransaction);




module.exports = router;