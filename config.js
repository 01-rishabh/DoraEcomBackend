const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connection is ready...');
}).catch((err) => {
    console.log(err);
});
