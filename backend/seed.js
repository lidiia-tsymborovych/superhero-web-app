require('dotenv').config();
const mongoose = require('mongoose');
const Superhero = require('./models/superheroModel');

const superheroes = [
  {
    nickname: 'Cat Woman',
    real_name: 'Selina Kyle',
    origin_description:
      'Selina Kyle grew up on the streets of Gotham, learning to survive through agility, wit, and cunning. She became a master thief and occasionally an anti-hero, walking the line between justice and crime.',
    superpowers: [
      'exceptional agility and reflexes',
      'expert hand-to-hand combatant',
      'skilled burglar and acrobat',
      'stealth and cat-like senses',
    ],
    catch_phrase: "I'm not your enemy… but I'm not your friend either.",
    images: ['catwoman.png'],
  },
  {
    nickname: 'Joker',
    real_name: 'Jack Napier',
    origin_description:
      'The Joker is a chaotic mastermind and criminal genius in Gotham City, known for his unpredictable nature and obsession with Batman. His past is shrouded in mystery, but his actions have left a trail of fear and chaos.',
    superpowers: [
      'high intelligence and strategic thinking',
      'mastery of psychological manipulation',
      'skilled in hand-to-hand combat and weapons',
      'immunity to fear and unpredictability',
    ],
    catch_phrase: 'Why so serious?',
    images: ['joker.png'],
  },
  {
    nickname: 'Superman',
    real_name: 'Clark Kent',
    origin_description:
      'Born on Krypton, sent to Earth as a baby by his parents to escape the planet’s destruction, he grows up with incredible powers and a strong moral compass, protecting humanity.',
    superpowers: ['flight', 'heat vision', 'super strength'],
    catch_phrase:
      "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
    images: ['superman.jpg'],
  },
  {
    nickname: 'Batman',
    real_name: 'Bruce Wayne',
    origin_description:
      'Orphaned as a child and witnessing the murder of his parents, he dedicates his life to fighting crime and protecting Gotham using intellect, physical prowess, and advanced technology.',
    superpowers: ['martial arts', 'intellect', 'gadgets'],
    catch_phrase: 'I am the night, the protector of Gotham!',
    images: ['batman.jpg'],
  },
  {
    nickname: 'Green Lantern',
    real_name: 'Hal Jordan',
    origin_description:
      'Chosen by the intergalactic Green Lantern Corps for his willpower and courage, he wields a power ring capable of creating anything he imagines, defending the universe from threats.',
    superpowers: ['power ring', 'flight'],
    catch_phrase:
      'In brightest day, in blackest night, no evil shall escape my sight!',
    images: ['greenlantern.jpg'],
  },
  {
    nickname: 'Aquaman',
    real_name: 'Arthur Curry',
    origin_description:
      'King of Atlantis, raised both underwater and on land, he bridges the worlds of humans and Atlanteans while protecting the seas from evil forces.',
    superpowers: ['underwater breathing', 'talk to sea creatures'],
    catch_phrase: 'By the seas, I shall defend both land and ocean!',
    images: ['aquaman.png'],
  },
  {
    nickname: 'Cyborg',
    real_name: 'Victor Stone',
    origin_description:
      'Cybernetic hero rebuilt after a life-threatening accident, merging human intellect with advanced technology to fight crime and protect the world.',
    superpowers: ['technopathy', 'strength', 'weaponry'],
    catch_phrase: 'I am the future, and I fight for justice!',
    images: ['cyborg.jpg'],
  },
  {
    nickname: 'Spider-Man',
    real_name: 'Peter Parker',
    origin_description:
      'Bitten by a radioactive spider, he gains superhuman abilities and takes on the responsibility of using them to protect New York City and the innocent.',
    superpowers: ['wall-crawling', 'spider sense', 'web-shooting'],
    catch_phrase: 'With great power comes great responsibility!',
    images: ['spiderman.jpg'],
  },

  {
    nickname: 'Wonder Woman',
    real_name: 'Diana Prince',
    origin_description:
      'Diana, princess of the Amazons, trained to be an unconquerable warrior. She left her island home to protect the world of man and fight for justice, love, and peace.',
    superpowers: [
      'super strength',
      'flight',
      'combat skill',
      'enhanced agility',
      'use of magical weapons',
    ],
    catch_phrase: 'Truth and justice will prevail!',
    images: ['wonderwoman.png'],
  },
  {
    nickname: 'Hulk',
    real_name: 'Bruce Banner',
    origin_description:
      'After exposure to gamma radiation during a lab accident, scientist Bruce Banner transforms into the Hulk when enraged, possessing immense strength and near-invulnerability.',
    superpowers: [
      'superhuman strength',
      'regeneration',
      'durability',
      'leap ability',
    ],
    catch_phrase: 'Hulk smash!',
    images: ['hulk.png'],
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
