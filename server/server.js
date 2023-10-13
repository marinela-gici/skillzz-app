const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
           
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());                          
app.use(express.urlencoded({ extended: true }));  
require('dotenv').config(); 
require('./config/mongoose.config');  
require('./routes/company.routes')(app);
require('./routes/job.routes')(app);
require('./routes/application.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

