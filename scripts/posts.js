// Receive the variables as parameters
function run(posts) {
    
    var postsCarousel = {
        "itemType": "application/vnd.lime.document-select+json",
        "items": []
    };

    function handle(element, index, array){
        postsCarousel.items.push(
            getCard(element.title, element.publishedDate, element.imageUrl, element.url)
        );
    }

    posts.forEach(handle);
    
    return postsCarousel;
}

function getCard(title, text, imageUrl, url){
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
                        "uri": url
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

run([{"url":"https://chatbotsbrasil.take.net/cobertura-take-sxsw/","title":"Trabalha com chatbots e não foi ao SXSW? Assista aos vídeos e ouça as principais palestras!","imageUrl":"https://chatbotsbrasil.take.net/wp-content/uploads/2018/03/sxsw.png","publishedDate":"27/03/2018"},{"url":"https://chatbotsbrasil.take.net/chatbot-com-inteligencia-artificial/","title":"Todo chatbot precisa de inteligência artificial? Entenda!","imageUrl":"https://chatbotsbrasil.take.net/wp-content/uploads/2018/03/inteligencia-artificial2.png","publishedDate":"20/03/2018"},{"url":"https://chatbotsbrasil.take.net/como-fazer-integracao-de-chatbots/","title":"Como e por que fazer a integração de chatbots a outras plataformas?","imageUrl":"https://chatbotsbrasil.take.net/wp-content/uploads/2018/03/outras-plataformas.png","publishedDate":"15/03/2018"},{"url":"https://chatbotsbrasil.take.net/level-up-plataforma-blip/","title":"Level Up da plataforma BLiP: Novidades no mercado de chatbots","imageUrl":"https://chatbotsbrasil.take.net/wp-content/uploads/2018/02/level-up.png","publishedDate":"27/02/2018"},{"url":"https://chatbotsbrasil.take.net/o-que-e-plataforma-de-chatbots/","title":"O que é plataforma de chatbots? Conheça as vantagens da ferramenta!","imageUrl":"https://chatbotsbrasil.take.net/wp-content/uploads/2018/02/plataforma-nova.png","publishedDate":"22/02/2018"}]);