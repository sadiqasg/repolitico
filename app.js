const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

const partyRoute = require('./routes/parties');
const officeRoute = require('./routes/offices');

app.get('/', (req, res, next) => {
  res.json({
    status: 200,
    message: 'app running..',
  });
});

app.use(partyRoute);
app.use(officeRoute);

app.use((req, res) => {
  res.json({
    status: 404,
    message: 'Page not found',
  })
});

app.listen(port, () => console.log(`app listening on port ${port}`));
