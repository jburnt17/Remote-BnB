"use strict";
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
        {
          email: faker.internet.email(),
          username: faker.name.firstName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          image: faker.image.avatar()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition"] },
      },
      {}
    );
  },
};
