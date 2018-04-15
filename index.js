var express = require('express');
var app = express();

app.get('/jobs', function (req, res) {

    var rp = require('request-promise');
    var cheerio = require('cheerio'); // Basically jQuery for node.js

    let currentJobs = [];

    var options = {
        uri: 'http://www.take.net/trabalhe-na-take/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const jobDivsClassesPattern = ".col-xs-offset-1.col-xs-10.col-sm-offset-0.col-sm-6.vcenter";

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            $(jobDivsClassesPattern).each(function (i, elem) {
                let data = $(this).find('p');
                let jobName = $(data[0]).text();
                let jobLocation = $(data[1]).text();
                let jobInfoUrl = $(this).find('a').attr('href');
                console.log(`${i}> ${jobName}, ${jobLocation}, ${jobInfoUrl}`);

                currentJobs.push({
                    name: jobName,
                    location: jobLocation,
                    infoUrl: jobInfoUrl
                });
            });

            res.send(currentJobs);
        })
        .catch(function (err) {
            res.send(err);
        });
});

app.get('/posts/:category', function (req, res) {

    var rp = require('request-promise');
    var cheerio = require('cheerio'); // Basically jQuery for node.js

    let category = req.params.category;
    let posts = [];

    var options = {
        uri: `https://chatbotsbrasil.take.net/tag/${category}`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const postsClassesPattern = ".blog-item-wrap";

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            $(postsClassesPattern).each(function (i, elem) {
                let metaData = $(this).find('a');
                let postUrl = $(this).find('a').attr('href');
                let postTitle = $(this).find('a').attr('title');
                let postImageUrl = $($(this).find('a img')[0]).attr('src');
                console.log(`${i}> ${postUrl}, ${postTitle}, ${postImageUrl}`);

                posts.push({
                    url: postUrl,
                    title: postTitle,
                    imageUrl: postImageUrl
                });
            });

            res.send(posts);
        })
        .catch(function (err) {
            res.send(err);
        });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
