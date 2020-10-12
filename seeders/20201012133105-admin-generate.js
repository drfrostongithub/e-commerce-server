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
   let userGenerate = [
    {
      email: "admin@mail.com",
      password: "1234",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: "putra@mail.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: "jack@mail.com",
      password: "bigbenlondon",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: "nonail@gmail.com",
      password: "nonene",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: "wehsing@hotmail.com",
      password: "singsing",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  return queryInterface.bulkInsert(`Users`, userGenerate, {})
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
