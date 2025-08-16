// superheroController.js
const mongoose = require('mongoose');
const fs = require('fs');
const Superhero = require('../models/superheroModel');
const DEFAULT_LIMIT = 5;


function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function removeFiles(filenames) {
  filenames.forEach(file => {
    fs.unlink(`uploads/${file}`, err => {
      if (err) console.error('Error deleting file:', file, err);
    });
  });
}

// --- CRUD ---
exports.getAllSuperheroes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const totalHeroes = await Superhero.countDocuments();
    const totalPages = Math.ceil(totalHeroes / DEFAULT_LIMIT);
    const superheroes = await Superhero.find()
      .skip((page - 1) * DEFAULT_LIMIT)
      .limit(DEFAULT_LIMIT)
      .select('nickname images'); // тільки необхідні поля для списку
    res.json({ superheroes, totalHeroes, totalPages, currentPage: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSuperheroById = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ message: 'Invalid ID' });

  try {
    const hero = await Superhero.findById(id);
    if (!hero) return res.status(404).json({ message: 'Hero not found' });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSuperhero = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.filename) : [];
    const newHero = new Superhero({ ...req.body, images });
    const savedHero = await newHero.save();
    res.status(201).json(savedHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSuperhero = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ message: 'Invalid ID' });

  try {
    const hero = await Superhero.findById(id);
    if (!hero) return res.status(404).json({ message: 'Hero not found' });

    // Додаємо нові фото
    if (req.files && req.files.length) {
      hero.images.push(...req.files.map(f => f.filename));
    }

    // Видаляємо фото, якщо передані removeImages
    if (req.body.removeImages) {
      const remove = Array.isArray(req.body.removeImages)
        ? req.body.removeImages
        : [req.body.removeImages];
      hero.images = hero.images.filter(img => !remove.includes(img));
      removeFiles(remove);
    }

    // Оновлення текстових полів
    [
      'nickname',
      'real_name',
      'origin_description',
      'superpowers',
      'catch_phrase',
    ].forEach(field => {
      if (req.body[field]) hero[field] = req.body[field];
    });

    const updatedHero = await hero.save();
    res.json(updatedHero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSuperhero = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ message: 'Invalid ID' });

  try {
    const hero = await Superhero.findById(id);
    if (!hero) return res.status(404).json({ message: 'Hero not found' });

    // Видаляємо всі фото з сервера
    removeFiles(hero.images);

    await Superhero.findByIdAndDelete(id);
    res.json({ message: 'Hero deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSuperheroImage = async (req, res) => {
  const { id, imageName } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID' });

  try {
    const hero = await Superhero.findById(id);
    if (!hero) return res.status(404).json({ message: 'Hero not found' });

    if (!hero.images.includes(imageName))
      return res.status(404).json({ message: 'Image not found' });

    hero.images = hero.images.filter(img => img !== imageName);
    await hero.save();

    const fsPath = require('path').join(__dirname, '../uploads', imageName);
    require('fs').unlink(fsPath, err => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
