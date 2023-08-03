import User from "../models/User.js"
import bcrypt from "bcryptjs"
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken"

//registration process
export const Register = async (req,res,next) => {
    try{
        //generating salt and hashing the password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password,salt)

        //creating user in DB
        const newUser = new User({
            ...req.body,password:hashedPassword
        })

        //saving password into db
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)

    }catch(err){
        next(err)
    }
}

//login process
export const Login = async (req,res,next) => {
    try{
        //finding user in db
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found!"))

        //checking if password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,"Wrong password"))

        //generating access token
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)

        //destructuring to extract the password and isAdmin properties from the server response
        const {password,isAdmin,...otherDetails} = user._doc

        res.cookie("access_token",token,{httpOnly:true}).status(200).json({details:{...otherDetails},isAdmin})

    }catch(err){
        next(err)
    }
}