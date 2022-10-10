'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      password: '123456',
      firstName: 'Thanh',
      lastName: 'Duy',
      address: 'VN',
      gender: 1,
      roleID: 'ROLE',
      phonenumber: '768591',
      positionID:'admin',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
