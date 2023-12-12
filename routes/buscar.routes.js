const { Router } = require('express');
const { check } = require('express-validator');
const { buscar } = require('../controllers/buscar.controller');

const router = Router();

router.get('/:colection/:param', buscar )

module.exports = router;