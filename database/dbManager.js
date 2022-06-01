const mongoose = require('mongoose');

function configureDb(){
// Refer to https://mongoosejs.com/docs/deprecations.html for the reasoning behind below statements.
// In general they are due to deprecations.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
}

async function connectToDb(onSuccess){
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Successfully connected to DB!');
        if (typeof onSuccess !== 'undefined'){
          onSuccess();
        }
      } catch (e) {
        console.log(e);
      }
}

module.exports = {configureDb,connectToDb}