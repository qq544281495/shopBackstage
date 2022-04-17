'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.login.index);
  router.post('/loginVerify', controller.login.loginVerify)
  router.get('/backstage', controller.backstage.index)
  router.get('/getUserInfo', controller.backstage.getUserInfo)
  router.post('/confirmUser', controller.backstage.confirmUser)
  router.post('/deleteUser', controller.backstage.deleteUser)
  router.get('/getGoodsInfo', controller.backstage.getGoodsInfo)
  router.post('/confirmGoods', controller.backstage.confirmGoods)
};