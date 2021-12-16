const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');

const jobs = require('./routes/job');
const users = require('./routes/user.js');
const favourites = require('./routes/favourite.js');

const mongoString = "mongodb+srv://anlanxu:Nishengri12138@cluster0.sbqhb.mongodb.net/JobBroad?retryWrites=true&w=majority";
mongoose.connect(mongoString, {useNewUrlParser: true})
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB: '));

const app = express();


app.use(session({secret: "SUPER_DUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
}));


app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/users', users);
app.use('/api/jobs', jobs);
app.use('/api/favourites', favourites);


// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//     // res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
  

// app.get('/', (req,res)=>{

//     // read cookies
//     console.log(req.cookies) 

//     let options = {
//         maxAge: 1000 * 60 * 15, // would expire after 15 minutes
//         httpOnly: true, // The cookie only accessible by the web server
//         signed: true // Indicates if the cookie should be signed
//     }

//     // Set cookie
//     res.cookie('cookieName', 'cookieValue', options) // options is optional
//     res.send('')

// })

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(8000, function() {
    console.log('Starting server');
});