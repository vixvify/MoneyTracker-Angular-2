const express = require('express');
const router = express.Router();
const { create, getData, deleteItem } = require('../controllers/listController');

router.get('/getData', getData);
router.post('/create', create);
router.delete('/deleteItem/:name', deleteItem);

module.exports = router;
