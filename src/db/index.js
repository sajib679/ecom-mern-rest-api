const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    await mongoose.connect(process.env.DATABASE_CREDENTIAL, connectionParams);
    console.log("connected to database:", process.env.DATABASE_CREDENTIAL);
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
};
