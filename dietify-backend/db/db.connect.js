const mongoose = require("mongoose");

async function initializeDBConnection() {
  // Connecting to DB
  try {
    await mongoose.connect(process.env.URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("successfully connected");
  } catch (error) {
    console.error("mongoose connection failed...", error);
  }
}

module.exports = { initializeDBConnection };
