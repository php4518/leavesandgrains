const isAdminUser = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'ADMIN';
const disableAdminUserAction = ({ record: { params: { role } = {} } = {} }) => role !== 'ADMIN';

module.exports = {
  isAdminUser,
  disableAdminUserAction
};
