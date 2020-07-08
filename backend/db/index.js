const mongoose = require('mongoose');

const initMongoose = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const { connection } = mongoose;

  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
};

module.exports = initMongoose;
