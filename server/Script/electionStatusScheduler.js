const cron = require('node-cron');
const electionModel = require('../models/election.model');

// Runs every minute
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    // Find ongoing elections whose endDate has passed
    const result = await electionModel.updateMany(
      { status: 'ongoing', endDate: { $lte: now } },
      { $set: { status: 'completed' } }
    );
    if (result.modifiedCount > 0) {
      console.log(`${result.modifiedCount} elections set to completed`);
    }
  } catch (err) {
    console.error('Error updating election status:', err);
  }
});