const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
      await mongoose.connect(
          process.env.DB_URL, { useNewUrlParser: true }, () => {
              console.log('Connected to database')
          } 
      );
    }
    catch(error){
      console.log('ERROR: ' + error);
    }
}

module.exports = connectToDatabase;