const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');
const terrainsController = require('../controllers/terrains');

router.post('/register', userControllers.register);
router.post('/login', userControllers.loginUser);
router.get('/terrainPage', terrainsController.getTerrainsByUserId);
module.exports = router;