import express from "express";
const router = express.Router();
import {verifyAdmin} from "../utils/verifyToken.js"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, hotels, updateHotel } from "../controlers/hotel.js"


//create hotel
router.post("/",verifyAdmin,createHotel)

//updating
router.put("/:id",verifyAdmin,updateHotel)

//deleting
router.delete("/:id",verifyAdmin,deleteHotel)

//get hotel
router.get("/find/:id",getHotel)

//get all hotesl
router.get("/",hotels)

//counting
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)

//get rooms in an hotel
router.get("/rooms/:id",getHotelRooms)

export default router