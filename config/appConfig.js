let appConfig = {};

appConfig.port = 5400;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb+srv://adnin:password@123@blogapi-izm2c.mongodb.net/blogAppDB?retryWrites=true&w=majority',
}
// mongodb://127.0.0.1:27017
// mongodb+srv://adnin:password@123@blogapi-izm2c.mongodb.net/BlogApi?retryWrites=true&w=majority
apiVersion = '/api/v1';

module.exports = {
    port: appConfig.port,
    db: appConfig.db,
    apiVersion: apiVersion
}
