const SELF_ONBOARDING = {
  firstName: 'test',
  lastName: `user${new Date().toISOString().slice(0, 10)}`,
  email: `test+${Math.floor(Math.random() * 1000000)}@chefhero.com`,
  password: 'test123',
  phone: '5192003344',
};

module.exports = {
  SELF_ONBOARDING,
};
