const express = require('express')
const shortid = require('shortid')

const BlogModel = require('../models/BlogMode')

let getAlBlogs = (req, res) => {
    console.log('aya')
    BlogModel.find()
        .select('-_v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.warn(err);
                res.send(err)
            }
            else if (result == undefined || result == null || result == '') {
                console.info('There is no blog found');
                res.send('There is no blog found');
            }
            else {
                res.send(result)
            }
        })
}

let viewByBlogId = (req, res) => {
    console.log('blogId', req.params.blogId)
    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.warn(err)
            res.send(err)
        }
        else if (result == undefined || result == null || result == '') {
            console.warn('No Blog foun');
            res.send('No Blog foun');
        }
        else {
            res.send(result);
        }
    });
}

let viewByAuthor = (req, res) => {
    console.log(req.query)
    res.send(req.query);
}

let viewByCategory = (req, res) => {
    console.log(req.query)
    res.send(req.query);
}

let deleteBlog = (req, res) => {
    console.log(req.query)
    res.send(req.query);
}

let editBlog = (req, res) => {
    let options = req.body;
    console.log(options);
    console.log(req.params.blogId)   
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            console.warn(err)
            res.send(err)
        }
        else if (result == undefined || result == null || result == '') {
            console.warn('No Blog foun');
            res.send('No Blog foun');
        }
        else {
            res.send(result);
        }
    })
    // BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
    //     if (err) {
    //         console.warn(err)
    //         res.send(err)
    //     }
    //     else if (result == undefined || result == null || result == '') {
    //         console.warn('No Blog foun');
    //         res.send('No Blog foun');
    //     }
    //     else {
    //         result.bodyHtml = options.bodyHtml ? options.bodyHtml : result.bodyHtml;
    //         result.description = options.description ? options.description : result.description;
    //         result.title = options.title ? options.title : result.title;
    //         res.tags = options.tags ? options.tags : result.tags;
    //         result.save((err, result) => {
    //             if (err) {
    //                 console.warn(err);
    //                 res.send(err)
    //             }
    //             else {
    //                 res.send(result);
    //             }
    //         })
    //     }

    // })
}

let createBlog = (req, res) => {
    var todayDate = Date.now()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.bodyHtml,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: todayDate,
        lastModified: todayDate

    });

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : [];
    newBlog.tags = tags;

    newBlog.save((err, result) => {
        if (err) {
            console.warn(err)
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
}

let increaseBlogView = (req, res) => {
    console.log(req.query)
    res.send(req.query);
}

let testQuery = (req, res) => {
    console.log(req.query)
    res.send(req.query);
}
let testRoute = (req, res) => {
    console.log(req.params)
    res.send(req.params);
}

let testBody = (req, res) => {
    console.log(req.body)
    res.send(req.body);
}

let helloWorld = (req, res) => { res.send("Hello") }

module.exports = {
    helloWorld: helloWorld,
    testQuery: testQuery,
    testRoute, testRoute,
    testBody: testBody,
    getAlBlogs,
    viewByAuthor,
    viewByBlogId,
    viewByCategory,
    deleteBlog,
    editBlog,
    createBlog,
    increaseBlogView

}
