const express = require('express');
const Model = require('../models/models');
const router = express.Router();

// Get All API
router.get('/getAll', async(req, res ) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch(error) {
        res.status(500).json({message: error})
    }
})
//Get by ID API
router.get('/getOne/:id', async(req, res ) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error) {
        res.status(500).json({message: error})
    }
})

//Post API
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Patch API
router.patch('/patch/:id', async (req, res ) => {
    try {
        const id = req.params.id;
        const dataToUppdate = req.body;
        const options = { new: true};

        const result = await Model.findByIdAndUpdate(
            id, dataToUppdate, options
        )

        res.send(result);
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

//Deleta API
router.delete('/delete/:id', async (req, res ) => {
    try {
        await Model.findOneAndDelete(req.params.id)
        res.send(`${req.params.id} has been Deleted`)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;