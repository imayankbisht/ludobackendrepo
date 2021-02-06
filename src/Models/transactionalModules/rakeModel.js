const mongoose = require("mongoose");

const rakeHistory = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true
    },
    channelId: {
      type: String,
      required: true
    },
    playerId: {
      type: String,
      required: true
    },
    winnerId: {
      type: String,
      required: true
    },
    winnerName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    playerUsername: {
      type: String,
      require: true
    },
    totalBetAmount: {
      type: Number,
      cast: "totalBetAmount = {VALUE} is not a valid number",
      required: true
    },
    rakeAmount: {
      type: Number,
      cast: "rakeAmount = {VALUE} is not a valid number",
      default: 0
    },
    startTime: {
      type: Number,
      required: true
    },
    endTime: {
      type: Number,
      required: true
    }
  },
  {
    optimisticConcurrency: true
  }
);

const RakeHistory = mongoose.model("RakeHistory", rakeHistory);

module.exports = RakeHistory;
