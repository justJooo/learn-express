const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

//Create - POST
router.post('/', userController.storeUser);
//Read - GET
router.get('/', userController.indexUsers);
router.get('/:id', userController.showUser);
//Update - PATCH
router.patch('/:id', userController.updateUser);
//Delete - DELETE
router.delete('/:id', userController.deleteUser);

module.exports = router;
