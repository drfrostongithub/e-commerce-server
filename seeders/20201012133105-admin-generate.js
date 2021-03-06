'use strict';
const fs = require(`fs`)


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
    let userGenerate = JSON.parse(fs.readFileSync(`./dataUser.json`, `utf-8`))

    let user = userGenerate.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    return queryInterface.bulkInsert(`Users`, user, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(`Users`, null, {})
  }
};
