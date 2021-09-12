const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const connectToDatabase = require('./dbconnect');
const app = express();
const port = process.env.PORT || 8080;

//Import routes
const sendMessageRoute = require('./routes/sendmessage');
const adminRoute = require('./routes/adminroute');

//Connect to database
connectToDatabase();

//Middleware
app.use(express.static('public'));
app.use(express.static('admin_panel/static'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Route middlewares
app.use('/api', sendMessageRoute);
app.use('/admin', adminRoute);



app.get('*', (req, res) => {
  	res.redirect('/');
})

app.get('/', (req, res) => {
  	res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.listen(port, () => {
  	console.log(`Server running at http://localhost:${port}`)
})

