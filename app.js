const express=require('express')
const app =express()
const bodyParser = require('body-parser');
const Book = require('./models/book');
const Borrower = require('./models/borrower');
const BorrowingProcess = require('./models/borrowingProcess');


app.get('/',(req,res)=>{res.send('bosta library management system')})

app.use(bodyParser.json());


const port= 5000

const start=()=>{    
        app.listen(port,()=>{console.log(`server is listening on port ${port}`)})
}
start()



