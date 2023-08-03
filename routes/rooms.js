import express from "express";
const router = express.Router();

import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controlers/room.js"
import { verifyAdmin } from "../utils/verifyToken.js";

//create
router.post("/:hotelId",verifyAdmin,createRoom)

//update room availabiility
router.put("/availability/:id",updateRoomAvailability)

//update room
router.put("/:id",verifyAdmin,updateRoom)

//delete room
router.delete("/:id/:hotelId",verifyAdmin,deleteRoom)

//get a room
router.get("/:id",getRoom)

//get all rooms
router.get("/",getRooms)

export default router