const express = require("express");
const blogController = require('../controllers/blogControllers')
const appConfig = require('../config/appConfig')

let setRouter = (app) => {    
    let baseUrl = appConfig.apiVersion+'/blogs';    
    // testing perpus created
    app.get('/hello',blogController.helloWorld);
    app.get('/test/query',blogController.testQuery);
    app.get('/test/route/:param1/:param2',blogController.testRoute);
    app.post('/test/body',blogController.testBody);

    app.get(baseUrl+'/all',blogController.getAlBlogs);
    app.get(baseUrl+'/view/:blogId',blogController.viewByBlogId);
    app.get(baseUrl+'/view/by/author/:author',blogController.viewByAuthor);
    app.get(baseUrl+'/view/by/author/:category',blogController.viewByCategory);
    app.post(baseUrl+'/:blogId/delete',blogController.deleteBlog);
    app.put(baseUrl+'/:blogId/edit',blogController.editBlog);
    app.post(baseUrl+'/create',blogController.createBlog);
    app.get(baseUrl+'/:blogId/count/views',blogController.increaseBlogView);
}
module.exports = {
    setRouter: setRouter
}
