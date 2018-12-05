const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const app = express();


app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

app.listen(config.port);
console.log(`\n---\n**Server started on port ${config.port}**`);
