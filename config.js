module.exports = {
    port: 4200,
    db: process.env.MONGODB || 'mongodb://localhost:27017/sylonuba',
    SECRET_TOKEN: 'miclavetokens',
    LEVEL_ADMIN: 1
}
