const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalsRoutes');

router.use(animalRoutes);

module.exports = router;