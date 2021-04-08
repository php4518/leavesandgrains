const config = require('../config');
const User = require('../modules/user/user.model');

const addAdminUser = async () => {
  await User.updateOne(
    { email: config.adminEmail },
    { $set: {
        password: User.generatePassword(config.adminPassword),
        role: 'ADMIN',
        firstName: 'Admin',
        lastName: 'Admin'
      }
    },
    { upsert: true }
  ).exec();
}

const seedDB = async () => {
  console.log('Seeding DB;')
  await addAdminUser();
}

module.exports = seedDB;
