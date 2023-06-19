const express = require("express");
const app = express();
const cors = require('cors')
const todoRouter = require('./routes/todos');
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use('/todos',todoRouter);

app.listen(3309,()=>{
    console.log("Server is running ...")
})