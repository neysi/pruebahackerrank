const express = require('express');
const Trade = require('../models/trades');
const router = express.Router();


router.post('/', async function (req, res, next) {

    const trade = Trade.build(req.body)
    await trade.save();

    res.status(201).json(trade);
});


router.get('/', async function (req, res, next) {

    const trades = await Trade.findAll({
        where:  req.query
    })

    res.json(trades);
});



router.get('/:id', async function (req, res, next) {

    const trade = await Trade.findByPk(req.params.id)


    if(!trade) {
        return res.status(404).send('ID not found');  
    }

    res.json(trade);
});


module.exports = router;
