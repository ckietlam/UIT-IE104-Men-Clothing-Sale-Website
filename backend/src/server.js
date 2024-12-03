import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import connectDB from './config/connectDB';
import session from 'express-session';
let app = express();
const path = require('path');
const __mainDir = path.resolve(__dirname, '../../frontend');
const __viewsDir = path.join(__mainDir, '/src');
const __publicDir = path.join(__mainDir, '/public');
app.set('views', __viewsDir);
app.set('view engine', 'ejs');
app.use(express.static(__publicDir));
app.use(session({
    secret: "example123",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 100000
    }
    })
    
)
require('dotenv').config();


// app.use(cors({ credentials: true, origin: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 
viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 8000;
//PORT === undefined => port = 8000
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port);
})