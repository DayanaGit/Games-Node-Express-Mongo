const express = require('express');
const router = express.Router();

const Game = require('../models/models');

//get all games 
router.get('/', async(req, res) => {
   const games = await Game.find(); 
   res.json(games);
    
});

//save game
router.post('/', async (req,res) =>{
    const {name,description,category,author} = req.body;
    const games= new Game({name,description,category,author});
    await games.save();
    res.json({status: 'Game Saved'});
});

//update game
router.put('/:id', async (req,res) => {
    const {name, description,category,author} = req.body;
    const newGame = {name,description,category,author};
    await Game.findByIdAndUpdate(req.params.id,newGame);
    res.json({status:'Game Updated'});
    console.log(req.params.id);
    res.json('received');
});

//delete game
router.delete('/:id', async (req,res) =>{
    await Game.findByIdAndRemove(req.params.id);
    res.json({status:'Game Deleted'});
});

//get only one game 
router.get('/:id', async(req,res) =>{
    const game = await Game.findById(req.params.id);
    res.json(game);
});

module.exports = router;