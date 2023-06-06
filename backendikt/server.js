const express = require('express'); //express wird importiert und eine Variable wird davon erzeugt
const cors = require('cors');
const postRoutes = require('./routes/posts.routes');
const regRoutes = require('./routes/registration.routes');
const loginRoutes = require('./routes/login.routes');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = 3000; //Portnummer wird festgelegt

app.use(express.json());
// enable cors for all requests
app.use(cors());
// app.use('/', routes);
app.use('/posts', postRoutes);
app.use('/registration', regRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, (error) => { //ab hier wird der Webserver gestartet
    //Callback-Funktion
    if (error) {
        console.log(error); //Falls port schon besetzt
    } else {
        console.log(`server running on http://localhost:${PORT}`);
    }
});

// connect to mongoDB, um Daten den Datenbank geheim zu halten
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to DB');
});

