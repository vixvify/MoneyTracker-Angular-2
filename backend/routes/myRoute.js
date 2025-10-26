const express = require('express');
const router = express.Router();
const {
  create,
  getData,
  deleteItem,
  getSingle,
  updateData,
} = require('../controllers/listController');

router.get('/getData', getData);
router.get('/getSingle/:name', getSingle);

router.post('/create', create);

router.patch('/updateData/:name', updateData);

router.delete('/deleteItem/:name', deleteItem);

module.exports = router;
