const express = require('express');
const router = require('../Router/router');
const dbConnection = require('../Database/config')
const swaggerSetup = require('../swagger');

const app = express();
const port = process.env.PORT || 3000;

dbConnection();
app.use(express.json());
swaggerSetup(app);
app.use('/api/', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
