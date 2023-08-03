const express = require('express');
const router = require('./routes/index');
const connect = require('./database/connection');
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors()) //used because of adding datas in to database from react
app.use(bodyParser.json())
app.use(express.json());
app.use('/', router);

 connect()

app.listen(PORT,()=>{
  console.log("server started");
})