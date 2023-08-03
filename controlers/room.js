import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

//creating a room
export const createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()

        //updating the room in its respective hotel
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})

        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)

    }catch(err){
        next(err)
    }
}

//update a room details
export const updateRoom = async (req,res,next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRoom)

    }catch(err){
        next(err)
    }
}

//get a room
export const getRoom = async (req,res,next) => {
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)

    }catch(err){
        next(err)
    }
}

//get all rooms
export const getRooms = async (req,res,next) => {
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)

    }catch(err){
        next(err)
    }
}

//delete a room
export const deleteRoom = async (req,res,next) => {
    const hotelId = req.params.hotelId

    //deleting a room from the Room model
    try{
        await Room.findByIdAndDelete(req.params.id)

        //deleting the room from the respective hotel
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        }catch(err){
            next(err)
        }
        res.status(200).json("Room has been deleted")

    }catch(err){
        next(err)
    }
}

//update room availability
export const updateRoomAvailability = async (req,res,next) => {
    try{
        await Room.updateOne({"roomNumbers._id":req.params.id},{$push:{"roomNumbers.$.unavailableDates":req.body.dates}})
        res.status(200).json("Room status has been updated")

    }catch(err){
        next(err)
    }
}