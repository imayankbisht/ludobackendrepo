const express = require("express");
const router = express.Router();
const Room = require("../Models/roomManagementModel");
const { encrypt, auth } = require("../Middleware/middleware");

//CREATE ROOM
router.post("/createroom", auth, async (req, res) => {
  try {
    const { bet, rakePercent, rakeCap, roomName } = req.body;

    if (!bet || !rakePercent || !rakeCap || !roomName)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    // const totalPrize = (bet - rakeCap) * 2;
    const newRoom = new Room({
      bet,
      rakePercent,
      rakeCap,
      // totalPrize,
      roomName
    });
    const savedRoom = await newRoom.save();
    console.log(savedRoom.bet);

    res.json(savedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET ALL ROOM
router.get("/all", auth, async (req, res) => {
  const rooms = await Room.find({});
  // rooms.map((room) => {
  //   let e = (room.bet - room.rakeCap) * 2;
  //   return rooms.push({ totalPrize: e });
  // });
  const allrooms = await encrypt(rooms);
  // console.log(allrooms);
  res.status(200).json(allrooms);
});

//GET EDIT ROOM
router.get("/edit/:id", auth, async (req, res) => {
  const loadroom = await Room.find({
    _id: req.params.id
  });
  console.log(loadroom);
  const loadRoom = await encrypt(loadroom);
  res.json(loadRoom);
});

//EDIT ROOM
router.put("/edit/:id", auth, async (req, res) => {
  // const { room } = req.body;
  // console.log(room);
  const { bet, rakePercent, rakeCap, roomName } = req.body;
  console.log(bet, rakePercent, rakeCap, roomName);
  const totalPrize = (bet - rakeCap) * 2;
  // console.log(totalPrize);

  const roomUpdate = {
    bet,
    rakePercent,
    rakeCap,
    totalPrize,
    roomName
  };

  const loadRoom = await Room.updateMany(
    {
      _id: req.params.id
    },
    roomUpdate
  );
  // console.log(loadRoom);
  res.status(200).json({ msg: "Room Updated Successfully !!!" });
});

//DELETE ROOM
router.delete("/:id", auth, async (req, res) => {
  const room = await Room.find({
    _id: req.params.id
  });
  console.log(room);
  if (!room)
    return res.status(400).json({
      msg: "No Room found with this ID."
    });
  const deletedRoom = await Room.deleteOne({
    _id: req.params.id
  });
  res.json(deletedRoom);
});

module.exports = router;
