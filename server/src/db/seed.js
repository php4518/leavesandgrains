const config = require('../config');
const User = require('../modules/user/user.model');

const addAdminUser = async () => {
  const admin = await User.findOne({email: config.adminEmail}).exec();
  if (!admin) {
    const adminUser = new User({
      email: config.adminEmail,
      password: User.generatePassword(config.adminPassword),
      role: 'ADMIN',
      name: 'Admin',
      phoneNumber: '9913267678'
    });
    await adminUser.save();
  } else {
    console.log('ADMIN ALREADY EXISTS');
  }
}

const seedDB = async () => {
  console.log('Seeding DB;')
  await addAdminUser();
}

module.exports = seedDB;
