require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const peopleRoutes = require('./routes/people');

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.send('Hello Andrew Richard...SON!!!!');
})

app.use('/people', peopleRoutes);

const port = 3000;
app.listen(port);
console.log(`Server running on port ${port}`);

