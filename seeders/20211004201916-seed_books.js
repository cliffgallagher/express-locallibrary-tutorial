'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('books', [{
        title: "The Name of the Wind (The Kingkiller Chronicle, #1)",
        author_id: 5,
        summary: "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
        isbn: "9781473211896",
        genre_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: "The Wise Man\'s Fear (The Kingkiller Chronicle, #2)",
        author_id: 5,
        summary: "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
        isbn: "9788401352836",
        genre_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: "The Slow Regard of Silent Things (Kingkiller Chronicle)",
        author_id: 5,
        summary: "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
        isbn: "9780756411336",
        genre_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: "Apes and Angels",
        author_id: 6,
        summary: "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
        isbn: "9780765379528",
        genre_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: "Death Wave",
        author_id: 6,
        summary: "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
        isbn: "9780765379504",
        genre_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('author', null, {});
  }
};
