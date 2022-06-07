require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const friendsRoutes = require('./routes/friends');

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.send('Hello Andrew Richard...SON!!!!');
})

app.use('/friends', friendsRoutes);

const port = 3000;
app.listen(port);
console.log(`Server running on port ${port}`);

