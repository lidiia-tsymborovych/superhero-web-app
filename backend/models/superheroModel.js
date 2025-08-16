// superheroModel.js
const mongoose = require('mongoose');
const superheroSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true },
    real_name: { type: String, required: true },
    origin_description: { type: String, required: true },
    superpowers: { type: [String], required: true },
    catch_phrase: { type: String, required: true },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

superheroSchema.virtual('mainImage').get(function () {
  return this.images[0] || null;
});
superheroSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Superhero', superheroSchema);