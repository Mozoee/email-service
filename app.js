const express = require('express');
const bodyParser = require('body-parser');
const emailRouter = require('./controllers/email');

const app = express();
app.use(bodyParser.json());

app.use('/email', emailRouter);

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("email-service is up and running");
  });
  