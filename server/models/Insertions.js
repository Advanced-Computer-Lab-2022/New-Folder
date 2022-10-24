// don't run the data already on the db
const mongoose = require('mongoose')
const Content = require('./Content')
const Course = require('./Course')
const Exercises = require('./Exercises')
const Instructor = require('./Instructor')
const Subtitle = require('./Subtitle')
const Trainee = require('./Trainee')
const bodyParser = require('body-parser')


mongoose
	.connect("mongodb+srv://NewFolderTeam:pass123456@cluster0.qvnetbs.mongodb.net/?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERROR", err));



const instructor =  Instructor.create({
    email: "Ins@Z3bola.com",
    username: "ins.z3bola",
    password: "0000",
    gender: "Male",
    image: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/79f588df19805b1d2dedfc3cfe27f68d~c5_100x100.jpeg?x-expires=1666789200&x-signature=S0VF2luObEtxbtalxYPEirJhuwo%3D",
    firstName: "Ins",
    lastName: "Z3bola",
    country: "Egypt",
    about: "I am Ins Z3bola",
    ratingNo: 10,
    rating: 5,
    reviews: ["Mr.Z3bola is the best", "No caption"]
})

const trainee =  Trainee.create({
    email : 'ziko@gmail.com',
    password  : '123@abc',
    username: "zico",
    gender : 'Male',
    firstName : 'Ziad Ahmed',
    lastName : 'Sadek',
    image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fsoccermemes%2Fcomments%2Flk7poi%2Fmini_messi%2F&psig=AOvVaw0u4Ixiztd9bx9fbxcRH-yL&ust=1666703775827000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIjU0cX5-PoCFQAAAAAdAAAAABAE',
    country:'USA',
    isCorporate:  false
})

const course = Course.create({
    name: "Z3bola z3bolism course",
    field: "z3bolism",
    price: {magnitude: 10, currency: "USD"},
    description: "we will learn how to learn",
    introVideo: "https://www.youtube.com/watch?v=S1aicEKamXk",
    rating: 5,
    ratingNo: 10,
    instructorID: instructor.schema.paths._id.toString()
})

// const express = require('express')
// const app = express()
// app.get('/', (req, res) => {
//     res.send(Instructor.find())
// })
// app.listen(3000)
console.log("finished")
