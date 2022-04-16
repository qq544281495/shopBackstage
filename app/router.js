'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.login.index);
  router.post('/loginVerify', controller.login.loginVerify)
  router.get('/backstage', controller.backstage.index)
};