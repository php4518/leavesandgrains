const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const resources = require('./resources')
const User = require('../modules/user/user.model')
const config = require('../config')
const { isAdminUser } = require('../utils')
// Admin setup

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  resources,
  rootPath: '/admin',
  branding: {
    companyName: 'Admin - Leaves and Grains',
  },
});
let router;
if(config.env === 'development') {
  router = AdminBroExpress.buildRouter(adminBro)
} else {
  router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email })

      if (user) {
        if (user.validPassword(password) && isAdminUser({ currentAdmin: user })) {
          console.log('login success')
          return user.safeModel();
        }
      }
      return false
    },
    cookiePassword: config.cookiePassword,
  })
}
module.exports = router;
