const mongoose = require('mongoose');
const YourModel = require('./models/voter.model'); // Adjust path if needed

const main = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/SmartVote');

    const idsToKeep = [
      new mongoose.Types.ObjectId('680fa858ab7c882e5b0de39c'),
      new mongoose.Types.ObjectId('681050ce84efce51295cbaae'),
      new mongoose.Types.ObjectId('6810516f84efce51295cbab0'),
    ];

    const result = await YourModel.deleteMany({ _id: { $nin: idsToKeep } });
    console.log(`Deleted ${result.deletedCount} documents.`);

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
};

main();
