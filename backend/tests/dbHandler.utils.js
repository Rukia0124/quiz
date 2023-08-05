const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

exports.dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 12345,
    },
  });

  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
