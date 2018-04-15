var express = require('express');
var app = express();

app.get('/', function (req, res) {
    //res.send('Hello World!');

    var rp = require('request-promise');
    var cheerio = require('cheerio'); // Basically jQuery for node.js

    var $ = cheerio.load('<div class="row jobs"> <div class="col-xs-12 col-sm-6 job"> <div class="row"> <div class="col-xs-12 col-sm-5 vcenter"> <figure> <img src="/wp-content/uploads/2016/10/vaga_po.png" alt="Vaga"> </figure> </div> <div class="col-xs-offset-1 col-xs-10 col-sm-offset-0 col-sm-6 vcenter"> <p>Gestor de Projetos (GP)/ Product Owner (PO)</p> <p>S&#xE3;o Paulo/SP</p> <a href="http://www.take.net/trabalhe-na-take/gp-po/">mais informa&#xE7;&#xF5;es</a> </div> </div> </div> <div class="col-xs-12 col-sm-6 job"> <div class="row"> <div class="col-xs-12 col-sm-5 vcenter"> <figure> <img src="/wp-content/uploads/2016/10/vaga_po.png" alt="Vaga"> </figure> </div> <div class="col-xs-offset-1 col-xs-10 col-sm-offset-0 col-sm-6 vcenter"> <p>Analista de Pr&#xE9;-Vendas (SDR)</p> <p>Belo Horizonte/MG</p> <a href="http://www.take.net/trabalhe-na-take/analista-de-pre-vendas/">mais informa&#xE7;&#xF5;es</a> </div> </div> </div></div>');

    var fruits = [];
    $('.col-xs-12.col-sm-6.job').each(function(i, elem) {
        fruits[i] = $(this).html();
    });

    console.log(fruits);

    // var options = {
    //     uri: 'http://www.take.net/trabalhe-na-take/',
    //     transform: function (body) {
    //         return cheerio.load(body);
    //     }
    // };

    // rp(options)
    //     .then(function ($) {
    //         // Process html like you would with jQuery...
    //         var x = $('.row .jobs').text();
    //         console.log(x);

    //         //.toArray()

    //     })
    //     .catch(function (err) {
    //         // Crawling failed or Cheerio choked...
    //     });


});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
