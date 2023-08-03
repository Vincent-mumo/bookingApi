import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

//creating new hotel
export const createHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)

    }catch(err){
        next(err)
    }
}

//updating a hotel
export const updateHotel = async (req,res,next) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel)

    }catch(err){
        next(err)
    }
}

//delete hotel
export const deleteHotel = async (req,res,next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")

    }catch(err){
        next(err)
    }
}

//get a single hotel
export const getHotel = async (req,res,next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)

    }catch(err){
        next(err)
    }
}

//get all hotels
export const hotels = async (req,res,next) => {
    //destructuring to get min and max from a query
        const {min,max,...others} = req.query

    try{
        const hotels = await Hotel.find({...others,cheapestPrice:{$gt:min || 1,$lt:max || 999}})
        .limit(req.query.limt)
        res.status(200).json(hotels)

    }catch(err){
        next(err)
    }
}

//counting hotels by City
export const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(",")

    try{
        const list = await ProgressEvent.call(
            cities.map((city) => {
                return Hotel.countDocuments({city:city})
            })
        )
        res.status(200).json(list)

    }catch(err){
        next(err)
    }
}

//counting by Type
export const countByType = async (req,res,next) => {
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ])

    }catch(err){
        next(err)
    }
}

//get rooms in a single hotel
export const getHotelRooms = async (req,res,next) => {
    try{
    const hotel = await Hotel.findById(req.params.id)
    const hotelRooms = await Promise.all(
        hotel.rooms.map((room)=> {
            return Room.findById(room)
        })
    )
    res.status(200).json(hotelRooms)
   }catch(err){
    next(err)
   }
}
