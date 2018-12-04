const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const config = require('./config');

const { sequelize } = require('./models');

const app = express();

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./config/passport');

require('./routes')(app);

sequelize.sync()
  .then(() => {
    app.listen(config.port);
    console.log(`\n---\n**Server started on port ${config.port}**`);
  });
