const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db')

const AuthRouter = require('./Routes/AuthRouter')
 

const PORT = process.env.PORT || 8080;
const cors  = require('cors');
const bodyParser = require('body-parser');

// middlewares
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

// routes
app.use('/auth',AuthRouter)
// app.use('/search',SearchRouter)
app.use("/api", AuthRouter); 
// server
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
    
})