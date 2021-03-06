var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

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

app.get('/posts/:category*?', function (req, res) {

    var rp = require('request-promise');
    var cheerio = require('cheerio'); // Basically jQuery for node.js

    let categoryFilter = '';
    if (req.params.category) {
        categoryFilter = `${req.params.category}`
    }

    let posts = [];

    var options = {
        uri: `https://take.net/blog/${categoryFilter}`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const postsClassesPattern = ".home-item";

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            $(postsClassesPattern).each(function (i, elem) {
                let metaData = $(this).find('a');
                let postUrl = $(this).find('a').attr('href');
                let postTitle = $(this).find('h3').text();
                let postImageUrl = $($(this).find('a img')[0]).attr('src');
                let postPublishedDate = $(this).find('.item-meta-date').text().trim();
                console.log(`${i}> ${postUrl}, ${postTitle}, ${postImageUrl}, ${postPublishedDate}`);

                posts.push({
                    url: postUrl,
                    title: postTitle,
                    imageUrl: postImageUrl,
                    publishedDate: postPublishedDate
                });
            });

            res.json(posts);
        })
        .catch(function (err) {
            res.send(err);
        });
});

app.get('/carouselPosts2/:category*?', function (req, res) {

    var rp = require('request-promise');
    var cheerio = require('cheerio'); // Basically jQuery for node.js

    let categoryFilter = '';
    if (req.params.category) {
        categoryFilter = `${req.params.category}`
    }

    let posts = [];

    var options = {
        uri: `https://take.net/blog/${categoryFilter}`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const postsClassesPattern = ".home-item";

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            $(postsClassesPattern).each(function (i, elem) {
                let metaData = $(this).find('a');
                let postUrl = $(this).find('a').attr('href');
                let postTitle = $(this).find('h3').text();
                let postImageUrl = $($(this).find('a img')[0]).attr('src');
                let postPublishedDate = $(this).find('.item-meta-date').text().trim();

                posts.push({
                    url: postUrl,
                    title: postTitle,
                    imageUrl: postImageUrl,
                    publishedDate: postPublishedDate
                });
            });

            var postsCarousel = {
                "itemType": "application/vnd.lime.document-select+json",
                "items": []
            };

            function getCard(title, text, imageUrl, url) {
                return {
                    "header": {
                        "type": "application/vnd.lime.media-link+json",
                        "value": {
                            "title": title,
                            "text": text,
                            "type": "image/jpeg",
                            "uri": imageUrl
                        }
                    },
                    "options": [
                        {
                            "label": {
                                "type": "application/vnd.lime.web-link+json",
                                "value": {
                                    "title": "Ler conteúdo",
                                    "uri": url,
                                    "target": "blank"
                                }
                            }
                        },
                        {
                            "label": {
                                "type": "application/vnd.lime.web-link+json",
                                "value": {
                                    "title": "Compartilhar",
                                    "uri": "http://www.adoteumgatinho.org.br"
                                }
                            }
                        }
                    ]
                }
            }

            function handle(element, index, array) {
                postsCarousel.items.push(
                    getCard(element.title, element.publishedDate, element.imageUrl, element.url)
                );
            }

            posts.forEach(handle);

            res.json(postsCarousel);
        })
        .catch(function (err) {
            res.send(err);
        });
});

app.get('/carouselPosts/:category*?', function (req, res) {

    var rp = require('request-promise');
    var cheerio = require('cheerio'); // Basically jQuery for node.js

    let categoryFilter = '';
    if (req.params.category) {
        categoryFilter = `${req.params.category}`
    }

    let posts = [];

    var options = {
        uri: `https://take.net/blog/${categoryFilter}`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const postsClassesPattern = ".home-item";

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            $(postsClassesPattern).each(function (i, elem) {
                let metaData = $(this).find('a');
                let postUrl = $(this).find('a').attr('href');
                let postTitle = $(this).find('h3').text();
                let postImageUrl = $($(this).find('a img')[0]).attr('src');
                let postPublishedDate = $(this).find('.item-meta-date').text().trim();

                posts.push({
                    url: postUrl,
                    title: postTitle,
                    imageUrl: postImageUrl,
                    publishedDate: postPublishedDate
                });
            });

            var postsCarousel = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": []
                    }
                }
            };

            function getCard(title, text, imageUrl, url) {
                return {
                    "title": title,
                    "subtitle": text,
                    "image_url": imageUrl,
                    "buttons": [
                        {
                            "type":"web_url",
                            "url":url,
                            "title":"Ler conteúdo"
                          },
                        {
                        "type": "element_share"
                    }
                    ]
                };
            }

            function handle(element, index, array) {
                postsCarousel.attachment.payload.elements.push(
                    getCard(element.title, element.publishedDate, element.imageUrl, element.url)
                );
            }

            posts.forEach(handle);

            res.json(postsCarousel);
        })
        .catch(function (err) {
            res.send(err);
        });
});

app.get('/jobsCard2', function (req, res) {

    var jobs = [{ "name": "Analista Contábil Fiscal", "location": "Belo Horizonte / MG", "infoUrl": "http://www.take.net/trabalhe-na-take/contabil-fiscal/" }, { "name": "Customer Success", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/analista-de-negocios-senior-2/" }, { "name": "Gestor de Projetos (GP)/ Product Owner (PO)", "location": "São Paulo/SP", "infoUrl": "http://www.take.net/trabalhe-na-take/gp-po/" }, { "name": "Analista de Pré-Vendas (SDR)", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/analista-de-pre-vendas/" }, { "name": "Outbound Sales Representative", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/outbound-sales-representative/" }, { "name": "Engenheir@ de Dados", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/engenheiro-de-dados/" }, { "name": "Analista de BI", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/analista-bi/" }, { "name": "User Experience (UX) SP", "location": "São Paulo/SP", "infoUrl": "http://www.take.net/trabalhe-na-take/user-experience-sp/" }, { "name": "User Experience (UX)", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/user-experience/" }, { "name": "Gestor de Projetos (GP)", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/gestor-de-projetos-product-owner/" }, { "name": "Developer – SP", "location": "São Paulo - SP", "infoUrl": "http://www.take.net/trabalhe-na-take/developer-sp/" }, { "name": "Desenvolvedor", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/desenvolvedor/" }, { "name": "Developer", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/developer/" }, { "name": "Estagiário de Desenvolvimento", "location": "São Paulo/SP", "infoUrl": "http://www.take.net/trabalhe-na-take/estagiario-de-desenvolvimento-2/" }, { "name": "Estagiário de Service Desk", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/estagiario-de-servicedesk/" }, { "name": "Product Owner (PO)", "location": "Belo Horizonte/MG", "infoUrl": "http://www.take.net/trabalhe-na-take/product-owner-po-2/" }];

    var carousel = {
        "itemType": "application/vnd.lime.document-select+json",
        "items": []
    };

    var total = jobs.length >= 7 ? 7 : jobs.length;

    for (var i = 0; i < total; i++) {
        carousel.items.push(
            {
                "header": {
                    "type": "application/vnd.lime.media-link+json",
                    "value": {
                        "title": jobs[i].name,
                        "text": jobs[i].location,
                        "type": "image/jpeg",
                    }
                },
                "options": [
                    {
                        "label": {
                            "type": "application/vnd.lime.web-link+json",
                            "value": {
                                "title": "Mais informações",
                                "text": "Mais informações",
                                "uri": jobs[i].infoUrl
                            }
                        }
                    }
                ]
            }
        )
    }

    res.json(carousel);
    //"application/vnd.lime.collection+json"
});

app.get('/jobsCard', function (req, res) {

    var rp = require('request-promise');
    var cheerio = require('cheerio'); // Basically jQuery for node.js

    let jobs = [];

    var options = {
        uri: 'http://www.take.net/trabalhe-na-take/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const jobDivsClassesPattern = ".vaga";

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            $(jobDivsClassesPattern).each(function (i, elem) {
                let data = $(this).find('p');
                let jobName = $(this).find('h3').text();
                let jobLocation = $(this).find('.t-vaga').text();
                let jobInfoUrl = $(this).find('a').attr('href');
                //console.log(`${i}> ${jobName}, ${jobLocation}, ${jobInfoUrl}`);

                jobs.push({
                    name: jobName,
                    location: jobLocation,
                    infoUrl: jobInfoUrl
                });
            });

            var carousel = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": []
                    }
                }
            };
        
            var total = jobs.length >= 7 ? 7 : jobs.length;
        
            for (var i = 0; i < total; i++) {
                carousel.attachment.payload.elements.push(
                    {
                        "title": jobs[i].name,
                        "subtitle": jobs[i].location,
                        "buttons": [
                            {
                                "type":"web_url",
                                "url":jobs[i].infoUrl,
                                "title":"Mais informações"
                              },
                            {
                            "type": "element_share"
                        }
                        ]
                    }
                )
            }
        
            res.json(carousel);
        })
        .catch(function (err) {
            res.send(err);
        });
    
    //"application/vnd.lime.collection+json"
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});
