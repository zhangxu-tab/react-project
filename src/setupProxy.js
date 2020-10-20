// 导入http-proxy-middleware
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    // 注册一个中间件
    app.use(proxy.createProxyMiddleware('/api',{
        // http://localhost:4000/api/banner => http://localhost:4000/banner
        target:'http://localhost:4000',
        pathRewrite: {
            '^/api': ''
        }
    }))
}