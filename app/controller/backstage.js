'usestrict';
const egg = require('egg');
module.exports = class BackstageController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('backstage/backstage.js');
    }

    async getUserInfo() {
        const { ctx } = this;
        const result = await ctx.service.backstage.getUserInfo()
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户列表数据失败'
            }
        }
    }

    async getGoodsInfo() {
        const { ctx } = this;
        const result = await ctx.service.backstage.getGoodsInfo()
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取商品列表数据失败'
            }
        }
    }

    async confirmUser() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.backstage.confirmUser(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户列表数据失败'
            }
        }
    }

    async deleteUser() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.backstage.deleteUser(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '删除用户失败'
            }
        }
    }

    async confirmGoods() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.backstage.confirmGoods(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '修改商品信息失败'
            }
        }
    }
}