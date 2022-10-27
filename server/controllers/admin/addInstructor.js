
const Instructor = require('../../models/Instructor')
exports.addInstructor = async (req , res) => {
    if(!(req.body)){
        res.status(400)
        throw new Error('Please Fill the required data')
    }
    console.log("alsjnalsblasna;ls;n;alksnd;laknsl;dknans")
    const instructor = await Instructor.create({
        username: req.body.username
        ,password:req.body.password
    })
    //.save() to save data in the db
   res.status(200).json(instructor)
    //joi library to authenticate schema
    //react entry points,0
}