const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    bet: {
      type: Number,
      cast: "Room Bet = {VALUE} is not a valid number",
      required: [true, "Room's Bet Amount is required, Given: {VALUE}"],
      // will create mongodb index against `bet` value
      unique: true,
      validate: {
        validator: (v) => v > 0,
        message: (props) =>
          `Bet MUST be greater than zero, Given: ${props.value}`
      }
    },
    rakePercent: {
      type: Number,
      cast: "Room RakePercent = {VALUE} is not a valid number",
      validate: {
        validator: (v) => v >= 0 && v <= 100,
        message: (props) =>
          `RakePercent MUST be zero to 100, Given: ${props.value}`
      }
    },
    rakeCap: {
      type: Number,
      cast: "Room rakeCap = {VALUE} is not a valid number",
      validate: {
        validator: (v) => v >= 0,
        message: (props) =>
          `rakeCap MUST be greater than zero, Given: ${props.value}`
      }
    },
    roomName: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    optimisticConcurrency: true
  }
);

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
