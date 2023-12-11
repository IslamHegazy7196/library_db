const express=require('express')
const app =express()
const bodyParser = require('body-parser');
const { Pool } = require('pg');


app.get('/',(req,res)=>{res.send('bosta library management system')})

app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: ' bostalib_db',
    password: '696969',
    port: 5432,
});



const port= 5000




const start=()=>{    
        app.listen(port,()=>{console.log(`server is listening on port ${port}`)})
}
start()