const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/**',
        createProxyMiddleware({
            // target: (process.env.NODE_ENV !== "production") ? 'http://localhost:5000' : 'https://pharm-backend-navy.vercel.app',
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/", // rewrite path
            },
        })
    );
};