const routes = require('next-routes')();

routes
  .add('/clients/new', '/clients/new')
  .add('/clients/:address', '/clients/show')
  .add('/clients/:address/claims', '/clients/claims/index')
  .add('/clients/:address/claims/new', '/clients/claims/new');

module.exports = routes;