const express = require('express');
const cors = require('cors');
const socket = require("socket.io");
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const paginate = require('express-paginate');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

require("dotenv").config();

app.use(express.json({limit: "5mb"}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.urlencoded({extended: true}));

app.use(paginate.middleware(10, 50));

// serve images from uploads directory
app.use('/images', express.static(UPLOADS_DIR))
require('dotenv').config();
require('./config/mongoose.config');
require('./routes/company.routes')(app);
require('./routes/job.routes')(app);
require('./routes/application.routes')(app);
require('./routes/contact.routes')(app);

const server = app.listen(8000, () => {
    console.log("Listening at Port 8000");
});

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    socket.on("newApplication", (data) => {
        console.log("newApplication");
        io.emit(`toClient`, data);
    });
});
