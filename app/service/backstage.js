const Service = require('egg').Service

class backstageService extends Service { 
    async getUserInfo() {
        const { app } = this;
        try {
            const result = await app.mysql.select('user')
            for (const item of result) {
                const verify = await app.mysql.get('backstage', { username: item.phone, password: item.password })
                if (verify) {
                    item['verify'] = true
                } else {
                    item['verify'] = false
                }
            }
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getGoodsInfo() {
        const { app } = this;
        try { 
            const result = await app.mysql.select('goods')
            for (const item of result) {
                item.goodsInfo = (item.goodsInfo).split(',')
                item['texture'] = item.goodsInfo[0]
                item['color'] = item.goodsInfo[1]
                item['size'] = item.goodsInfo[2]
            }
            return result
        }catch (error) {
            console.log(error);
            return null
        }
    }

    async confirmUser(params) {
        const { app } = this;
        try {
            let { verify, ...user } = params;
            const exist = await app.mysql.get('backstage', { username: user.phone, password: user.password })
            if (verify) {
                if (!exist) {
                  await app.mysql.insert('backstage', { username: user.phone, password: user.password, nickname: user.name });
                }
            } else {
                if (exist) {
                    await this.app.mysql.delete('backstage', { username: user.phone, password: user.password });
                }
            }
            const result = await app.mysql.update('user', user, { where: { phone: params.phone, password: params.password } });
            if (result.affectedRows === 1) {
                return {code: 200, message: '用户信息修改成功'}
            } else {
                return {code: 200, message: '用户信息修改失败'}
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async deleteUser(params) {
        const { app } = this;
        try {
            const deleteBackstage = await app.mysql.delete('backstage', { username: params.phone, password: params.password });
            const deleteUser = await app.mysql.delete('user', { phone: params.phone, password: params.password });
            if (deleteBackstage.affectedRows === 1 && deleteUser.affectedRows === 1) { 
                return { code: 200, message: '删除用户信息成功'}
            } else {
                return { code: 500, message: '删除用户信息失败'}
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteGoods(params) {
        const { app } = this;
        try {
            const result = await app.mysql.delete('goods', { goodsId: params.goodsId });
            if (result.affectedRows === 1) { 
                return { code: 200, message: '删除商品信息成功'}
            } else {
                return { code: 500, message: '删除商品信息失败'}
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async confirmGoods(params) {
        const { app } = this;
        try {
            let { texture, color, size, ...goods } = params
            goods.goodsInfo = texture + ',' + color + ',' + size
            const result = await app.mysql.update('goods', goods, { where: { goodsId: params.goodsId } });
            if (result.affectedRows === 1) {
                return { code: 200, message: '修改商品信息成功'}
            } else {
                return { code: 500, message: '修改商品信息失败'}
            }
        }catch (error) {
            console.log(error);
            return null;
        }
    }

    async addGoods(params) {
        const { app } = this;
        try {
            let { texture, color, size, ...goods } = params
            goods.goodsInfo = texture + ',' + color + ',' + size
            const result = await app.mysql.insert('goods', {...goods});
            if (result.affectedRows === 1) {
                return { code: 200, message: '修改商品信息成功'}
            } else {
                return { code: 500, message: '修改商品信息失败'}
            }
        }catch (error) {
            console.log(error);
            return null;
        }
    }

    async getEvaluate() {
        const { app } = this;
        try {
            let result = []
            const evaluate = await app.mysql.select('evaluate')
            for (const item of evaluate) {
                const user = await app.mysql.get('user', { userId: item.userId })
                const goods = await app.mysql.get('goods', { goodsId: item.goodsId })
                result.push({
                    ...item,
                    ...user,
                    ...goods
                })
            }
            return result
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteEvaluate(params) {
        const { app } = this;
        try {
            const result = await app.mysql.delete('evaluate', { evaluateId: params.evaluateId });
            if (result.affectedRows === 1) { 
                return { code: 200, message: '删除商品信息成功'}
            } else {
                return { code: 500, message: '删除商品信息失败'}
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOrder() {
        const { app } = this;
        try {
            let result = []
            const order = await app.mysql.select('order');
            for (const item of order) {
                const user = await app.mysql.get('user', { userId: item.userId })
                result.push({
                    ...item,
                    ...user
                })
            }
            return result
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = backstageService