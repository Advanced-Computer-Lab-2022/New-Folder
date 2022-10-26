const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Instructor = require('../models/Instructor')
//POST
const registerInstructor = asyncHandler(async(req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    if(!username||!email||!password){
        res.status(400);
        throw new Error('please add all fields')
    }

    //check if user exists
    const userExists = await Instructor.findOne({username});
    if(userExists){
        res.status(400)
        throw new Error("ALready exists");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const instructor = await Instructor.create({
        username,
        email,
        password: hashedPassword,
        lastName: 'sadek',
        firstName: 'ziad',
        gender: 'Male',
        rating: 1
    })

    if(instructor){
        res.status(201).json({
            _id: instructor.id,
            username: instructor.userName,
            email: instructor.email,

            token: generateToken(instructor._id)
        }
        )
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})
// POST
const loginInstructor = asyncHandler(async(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const instructor = await Instructor.findOne({username})

    if(instructor&&(await bcrypt.compare(password,instructor.password))){
        res.status(201).json({
            _id: instructor.id,
            userName: instructor.userName,
            email: instructor.email,
            token: generateToken(instructor._id)
        }
        )
    }else{
        res.status(400)
        throw new Error("invalid credintials")
    }
})
// GET
const getInstructor = asyncHandler(async(req,res)=>{
    const {_id,userName,email} = await Instructor.findById(req.user.id)
    res.status(200).json({
        id:_id,
        userName,
        email,
    })
})

// Generate token

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}
module.exports = {
    registerInstructor,
    loginInstructor,
    getInstructor,
}