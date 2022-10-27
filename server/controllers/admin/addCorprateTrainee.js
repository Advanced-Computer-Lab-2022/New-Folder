
const CorpTrainee = require('../../models/Trainee')
exports.addCorpTrainee = async (req , res) => {
    if(!(req.body)){
        res.status(400)
        throw new Error('Please Fill the required data')
    }
    const corpTrainee = await CorpTrainee.create({
      
        username: req.body.username
        ,email:req.body.email
        ,password:req.body.password
        ,firstName:req.body.firstName
        ,gender: req.body.gender
        ,lastName: req.body.lastName
        ,userType: "corpTrainee"
        ,courses: req.body.courses
        ,image: req.body.image
        ,country: req.body.country
        ,fields: req.body.fields
    })
    res.status(200).json(corpTrainee)

}