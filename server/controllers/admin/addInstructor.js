
const Instructor = require('../../models/Instructor')
exports.addInstructor = async (req , res) => {
    if(!(req.body)){
        res.status(400)
        throw new Error('Please Fill the required data')
    }
    const instructor = await Instructor.create({
      
        username: req.body.username
        ,email:req.body.email
        ,password:req.body.password
        ,firstName:req.body.firstName
        ,gender: req.body.gender
        ,lastName: req.body.lastName
        ,rating: req.body.rating,
        ratingNo: req.body.ratingNo
        ,courses: req.body.courses
        ,image: req.body.image
        ,country: req.body.country
        ,about: req.body.about
        ,reviews: req.body.reviews
    }).save()  //.save() to save data in the db
  //  res.status(200).json(instructor)
    //joi library to authenticate schema
    //react entry points,0
}