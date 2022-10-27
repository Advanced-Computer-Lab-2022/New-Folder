
const CorpTrainee = require('../../models/Trainee')
exports.addCorpTrainee = async (req , res) => {
    if(!(req.body)){
        res.status(400)
        throw new Error('Please Fill the required data')
    }
    const corpTrainee = await CorpTrainee.create({
      
        username: req.body.username
        ,password:req.body.password
        ,userType: "corpTrainee"
    })
    res.status(200).json(corpTrainee)

}