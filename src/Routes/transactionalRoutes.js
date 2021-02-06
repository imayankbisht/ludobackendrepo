const express = require("express");
const router = express.Router();
const DepositHistory = require("../Models/transactionalModules/depositModel");
const RefundHistory = require("../Models/transactionalModules/refundModel");
const RakeHistory = require("../Models/transactionalModules/rakeModel");
const WithdrawlHistory = require("../Models/transactionalModules/withdrawModel");
const { encrypt, auth } = require("../Middleware/middleware");

// router.post("/depositHistory", auth, async (req, res) => {
//   try {
//     const {
//       roomId,
//       channelId,
//       playerId,
//       userName,
//       status,
//       amountDeposited,
//       time
//     } = req.body;
//     if (
//       !roomId ||
//       !playerId ||
//       !userName ||
//       !status ||
//       !amountDeposited ||
//       !time
//     )
//       return res.status(400).json({ msg: "Not all fields have been entered." });

//     const newDeposit = new DepositHistory({
//       roomId,
//       channelId,
//       playerId,
//       userName,
//       status,
//       amountDeposited,
//       time
//     });
//     const savedDeposit = await newDeposit.save();
//     console.log(savedDeposit);
//     res.json(savedDeposit);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

//Get All Deposit History
router.get("/depositHistory", auth, async (req, res) => {
  const response = await DepositHistory.find({});
  const Response = await encrypt(response);
  res.status(200).json(Response);
});

//playerrefundHistory
// router.post("/refundHistory", auth, async (req, res) => {
//   try {
//     const {
//       roomId,
//       // channelId,
//       playerId,
//       userName,
//       status,
//       amountRefunded,
//       time
//     } = req.body;
//     if (
//       !roomId ||
//       !playerId ||
//       !userName ||
//       !status ||
//       !amountRefunded ||
//       !time
//     )
//       return res.status(400).json({ msg: "Not all fields have been entered." });

//     const newRefund = new RefundHistory({
//       roomId,
//       // channelId,
//       playerId,
//       userName,
//       status,
//       amountRefunded,
//       time
//     });
//     const savedRefund = await newRefund.save();
//     console.log(savedRefund);
//     res.json(savedRefund);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

//Get All Refund History
router.get("/refundHistory", auth, async (req, res) => {
  const response = await RefundHistory.find({});
  const Response = await encrypt(response);
  res.status(200).json(Response);
});

// rakeHistory
router.post("/rakeHistory", auth, async (req, res) => {
  try {
    console.log(req.body);
    const {
      roomId,
      channelId,
      playerId,
      winnerId,
      winnerName,
      username,
      playerUsername,
      totalBetAmount,
      rakeAmount,
      startTime,
      endTime
    } = req.body;
    if (
      !roomId ||
      !channelId ||
      !playerId ||
      !winnerId ||
      !winnerName ||
      !username ||
      !playerUsername ||
      !totalBetAmount ||
      !rakeAmount ||
      !startTime ||
      !endTime
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newRake = new RakeHistory({
      roomId,
      channelId,
      playerId,
      winnerId,
      winnerName,
      username,
      playerUsername,
      totalBetAmount,
      rakeAmount,
      startTime,
      endTime
    });
    const savedRake = await newRake.save();
    console.log(savedRake);
    res.json(savedRake);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get All Rake History
router.get("/rakeHistory", auth, async (req, res) => {
  const response = await RakeHistory.find({});
  console.log(response);
  const Response = await encrypt(response);
  res.status(200).json(Response);
});

// WithdrawlHistory
// router.post("/withdrawlHistory", auth, async (req, res) => {
//   try {
//     console.log(req.body);
//     const {
//       roomId,
//       channelId,
//       playerId,
//       userName,
//       gameStatus,
//       withdrawAmount,
//       time
//     } = req.body;
//     if (
//       !roomId ||
//       !channelId ||
//       !playerId ||
//       !userName ||
//       !gameStatus ||
//       !withdrawAmount ||
//       !time
//     )
//       return res.status(400).json({ msg: "Not all fields have been entered." });

//     const newWithdraw = new WithdrawlHistory({
//       roomId,
//       channelId,
//       playerId,
//       userName,
//       gameStatus,
//       withdrawAmount,
//       time
//     });
//     const savedWithdraw = await newWithdraw.save();
//     console.log(savedWithdraw);
//     res.json(savedWithdraw);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

//Get All Withdrawl History
router.get("/withdrawlHistory", auth, async (req, res) => {
  const response = await WithdrawlHistory.find({});
  const Response = await encrypt(response);

  res.status(200).json(Response);
});

module.exports = router;
