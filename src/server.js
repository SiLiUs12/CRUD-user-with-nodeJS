const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine.js');
const initWebRoutes = require('./route/web.js');
const connectDB = require('./config/connectDB.js')
const cors = require('cors')

let app = express();
app.use(cors({origin:true}));

const server = require('http').createServer(app);


require('dotenv').config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app);
initWebRoutes(app);

connectDB();


let port = process.env.PORT || 8080;

app.listen(port,() =>{
    console.log("Backend node js is running on the port: " + port)
})


