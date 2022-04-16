const Service = require('egg').Service

class loginService extends Service {
    async loginVerify(params) {
        const { app } = this;
        try {
            const token = app.jwt.sign({ phone: params.username }, app.config.jwt.secret, { expiresIn: '1h' });
            const result = await app.mysql.select('backstage', { where: { username: params.username, password: params.password } })
            if (result.length != 0) {
                return { code: 200, token, username: result[0].username, message: '登录成功'}
            } else {
                return { code: 500, message: '账号或密码错误'}
            }
        } catch (err) {
            console.log(error);
            return null
        }
    }
}

module.exports = loginService