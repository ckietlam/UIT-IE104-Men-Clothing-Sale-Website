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
        maxAge: 24 * 60 * 60 * 1000

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

// Thêm điểm cuối `/intermediary` cho Zalopay chuyển thẳng về Website
app.get('/intermediary', (req, res) => {
    // Địa chỉ ngrok cuối cùng bạn muốn chuyển hướng đến
    res.redirect('https://a733-2001-ee0-4f05-51b0-fcfb-5527-83b2-f1b2.ngrok-free.app/product-view-all');
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