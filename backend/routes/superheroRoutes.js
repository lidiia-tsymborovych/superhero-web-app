const express = require('express');
const router = express.Router();
const controller = require('../controllers/superheroController');
const upload = require('../middlewares/upload');

router.get('/', controller.getAllSuperheroes);
router.get('/:id', controller.getSuperheroById);
router.post('/', upload.array('images'), controller.createSuperhero);
router.put('/:id', upload.array('images'), controller.updateSuperhero);
router.delete('/:id', controller.deleteSuperhero);
router.delete('/:id/images/:imageName', controller.deleteSuperheroImage);


module.exports = router;
