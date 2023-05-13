const express = require('express');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const path = require('path');

const app = express();

// CORS
app.use(
    cors(),
    session({
        genid: (req) => {
            console.log('1. in genid req.sessionID: ', req.sessionID);
            return uuidv4(); // use UUIDs for session IDs
        }
        , 
        store: new FileStore(),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }));

//app.use(express.static('../frontend'));
app.use(express.static('public'));

// Index route
app.get('/', (req, res) => {
    console.log("get / req.sessionID: ", req.sessionID);
    //alert("hello");
    //res.send('Hello World!');
    });

// test route
app.get('/test', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

// home route
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './public/home.html'));
    
    //res.sendFile(path.resolve(__dirname, '../frontend/home.html'));
    /*fs.readFile(path.resolve(__dirname, '../frontend/home.html'), function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();*/
    console.log("get /home req.sessionID: ", req.sessionID);
});

// Rust route
app.get('/rust', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/rust.html'));
    console.log("connection successful");
});

const port = process.env.PORT || 4; // This line of code sets the port to 4004

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // This line of code logs the port to the console
});