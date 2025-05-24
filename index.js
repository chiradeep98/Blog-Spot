const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/route');
const userRouter = require('./routes/userRoutes');
const connectMongoDb = require('./config/connection');
const { checkForAuthenticationCookie } = require('./middleware/auth');
const blogRouter = require('./routes/blogRoutes');

const app = express();
const PORT = 8000;

connectMongoDb('mongodb://127.0.0.1:27017/blogspot')
.then(()=>{console.log('MongoDb Connected')})
.catch((error) => {console.log('Error occured connecting MongoDb', error)});


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));


app.use('/', router);
app.use('/user', userRouter);
app.use('/blog', blogRouter);


app.listen(PORT, ()=> {console.log(`Server Started at PORT: ${PORT}`)});