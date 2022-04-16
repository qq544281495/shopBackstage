'usestrict';
const egg = require('egg');
module.exports = class BackstageController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('backstage/backstage.js');
    }
}