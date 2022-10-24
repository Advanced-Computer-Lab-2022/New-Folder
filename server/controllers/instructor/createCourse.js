const Course = require('../../models/Course')

const createCourse = async (req, res) => {
    console.log(req.body.description)
    const course = await Course.create({
        description: req.body.description,
        name: req.body.name,
        field: req.body.field,
        price: {magnitude: req.body.magnitude, currency: req.body.currency},
        instructorID: 10,
    })
    res.json(course)
}

module.exports = {createCourse}