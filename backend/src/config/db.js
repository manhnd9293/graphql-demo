const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
// mongoose.set('debug', true)

async function connectDb() {
  try{
    const  uri = `mongodb://admin:admin@localhost:27019/demo-gql-data?authSource=admin`;
    await mongoose.connect(
      uri,
      {
        connectTimeoutMS: 5000
      }
    );
    console.log(`connect db success`);
  } catch (e) {
    console.log(`connect db fail with error: ${e.toString()}`)
  }
}


module.exports = {connectDb}