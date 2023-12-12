const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const notFoundMiddleware=require('./middleware/not-found')
// const errorHandlerMiddleware=require('./middleware/error-handler')


const bookRouter= require('./routes/bookRouter')
const borrowerRouter= require('./routes/borrowerRouter')
const borrowingProcessRouter= require('./routes/borrowingProcessRouter')


app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("bosta library management system");
});
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/borrower',borrowerRouter)
app.use('/api/v1/borrowingProcess',borrowingProcessRouter)
app.use(notFoundMiddleware)
// app.use(errorHandlerMiddleware)

const port = 5000;

const start = () => {
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};
start();
