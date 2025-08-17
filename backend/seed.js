// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Superhero = require('./models/superheroModel');

const superheroes = [
  {
    nickname: 'Superman',
    real_name: 'Clark Kent',
    origin_description: 'Born on Krypton...',
    superpowers: ['flight', 'heat vision', 'super strength'],
    catch_phrase:
      "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
    images: [
      'superman1.jpg',
      'superman1.jpg',
      'superman1.jpg',
      'superman1.jpg',
      'superman2.jpg',
    ],
  },
  {
    nickname: 'Batman',
    real_name: 'Bruce Wayne',
    origin_description: 'Orphaned as a child...',
    superpowers: ['martial arts', 'intellect', 'gadgets'],
    catch_phrase: 'I am the night!',
    images: ['batman1.jpg'],
  },
  {
    nickname: 'Wonder Woman',
    real_name: 'Diana Prince',
    origin_description: 'Amazonian princess...',
    superpowers: ['super strength', 'flight', 'combat skill'],
    catch_phrase: 'For justice!',
    images: ['wonderwoman1.jpg'],
  },
  {
    nickname: 'Flash',
    real_name: 'Barry Allen',
    origin_description: 'Gained super speed...',
    superpowers: ['super speed', 'time travel'],
    catch_phrase: 'Fastest man alive!',
    images: ['flash1.jpg'],
  },
  {
    nickname: 'Green Lantern',
    real_name: 'Hal Jordan',
    origin_description: 'Chosen by ring...',
    superpowers: ['power ring', 'flight'],
    catch_phrase: 'In brightest day, in blackest night...',
    images: ['greenlantern1.jpg'],
  },
  {
    nickname: 'Aquaman',
    real_name: 'Arthur Curry',
    origin_description: 'King of Atlantis...',
    superpowers: ['underwater breathing', 'talk to sea creatures'],
    catch_phrase: 'By the seas!',
    images: ['aquaman1.jpg'],
  },
  {
    nickname: 'Cyborg',
    real_name: 'Victor Stone',
    origin_description: 'Cybernetic hero...',
    superpowers: ['technopathy', 'strength', 'weaponry'],
    catch_phrase: 'I am the future!',
    images: ['cyborg1.jpg'],
  },
  {
    nickname: 'Spider-Man',
    real_name: 'Peter Parker',
    origin_description: 'Bitten by a radioactive spider...',
    superpowers: ['wall-crawling', 'spider sense', 'web-shooting'],
    catch_phrase: 'With great power comes great responsibility!',
    images: ['spiderman1.jpg'],
  },
  {
    nickname: 'Iron Man',
    real_name: 'Tony Stark',
    origin_description: 'Genius billionaire...',
    superpowers: ['powered armor suit', 'genius intellect'],
    catch_phrase: 'I am Iron Man!',
    images: ['ironman1.jpg'],
  },
  {
    nickname: 'Captain America',
    real_name: 'Steve Rogers',
    origin_description: 'Super soldier...',
    superpowers: ['super strength', 'strategist', 'shield mastery'],
    catch_phrase: 'I can do this all day!',
    images: ['captainamerica1.jpg'],
  },
  {
    nickname: 'Superman',
    real_name: 'Clark Kent',
    origin_description: 'Born on Krypton...',
    superpowers: ['flight', 'heat vision', 'super strength'],
    catch_phrase:
      "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
    images: [
      'superman1.jpg',
      'superman1.jpg',
      'superman1.jpg',
      'superman1.jpg',
      'superman2.jpg',
    ],
  },
  {
    nickname: 'Batman',
    real_name: 'Bruce Wayne',
    origin_description: 'Orphaned as a child...',
    superpowers: ['martial arts', 'intellect', 'gadgets'],
    catch_phrase: 'I am the night!',
    images: ['batman1.jpg'],
  },
  {
    nickname: 'Wonder Woman',
    real_name: 'Diana Prince',
    origin_description: 'Amazonian princess...',
    superpowers: ['super strength', 'flight', 'combat skill'],
    catch_phrase: 'For justice!',
    images: ['wonderwoman1.jpg'],
  },
  {
    nickname: 'Flash',
    real_name: 'Barry Allen',
    origin_description: 'Gained super speed...',
    superpowers: ['super speed', 'time travel'],
    catch_phrase: 'Fastest man alive!',
    images: ['flash1.jpg'],
  },
  {
    nickname: 'Green Lantern',
    real_name: 'Hal Jordan',
    origin_description: 'Chosen by ring...',
    superpowers: ['power ring', 'flight'],
    catch_phrase: 'In brightest day, in blackest night...',
    images: ['greenlantern1.jpg'],
  },
  {
    nickname: 'Aquaman',
    real_name: 'Arthur Curry',
    origin_description: 'King of Atlantis...',
    superpowers: ['underwater breathing', 'talk to sea creatures'],
    catch_phrase: 'By the seas!',
    images: ['aquaman1.jpg'],
  },
  {
    nickname: 'Cyborg',
    real_name: 'Victor Stone',
    origin_description: 'Cybernetic hero...',
    superpowers: ['technopathy', 'strength', 'weaponry'],
    catch_phrase: 'I am the future!',
    images: ['cyborg1.jpg'],
  },
  {
    nickname: 'Spider-Man',
    real_name: 'Peter Parker',
    origin_description: 'Bitten by a radioactive spider...',
    superpowers: ['wall-crawling', 'spider sense', 'web-shooting'],
    catch_phrase: 'With great power comes great responsibility!',
    images: ['spiderman1.jpg'],
  },
  {
    nickname: 'Iron Man',
    real_name: 'Tony Stark',
    origin_description: 'Genius billionaire...',
    superpowers: ['powered armor suit', 'genius intellect'],
    catch_phrase: 'I am Iron Man!',
    images: ['ironman1.jpg'],
  },
  {
    nickname: 'Captain America',
    real_name: 'Steve Rogers',
    origin_description: 'Super soldier...',
    superpowers: ['super strength', 'strategist', 'shield mastery'],
    catch_phrase: 'I can do this all day!',
    images: ['captainamerica1.jpg'],
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Superhero.deleteMany();
    await Superhero.insertMany(superheroes);
    console.log('🌱 Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();