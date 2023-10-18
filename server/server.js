const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const UPLOADS_DIR = path.join(__dirname, 'uploads');


app.use(express.json({limit: "5mb"}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.urlencoded({extended: true}));

// serve images from uploads directory
app.use('/images', express.static(UPLOADS_DIR))
require('dotenv').config();
require('./config/mongoose.config');
require('./routes/company.routes')(app);
require('./routes/job.routes')(app);
require('./routes/application.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

