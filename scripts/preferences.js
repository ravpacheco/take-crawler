// Receive the variables as parameters
function run(business, developer, design, trend) {

    var isBusiness = (business == 'true');
    var isDeveloper = (developer == 'true');
    var isDesign = (design == 'true');
    var isTrend = (trend == 'true');

    var preferences = {
        business: '🤝️ Negócios',
        developer: '💻️ Desenvolvimento',
        design: '💡️ Design',
        trend: '🚀️ Tendências',
        subscribe: '✅ Assinar conteúdo',
        unsubscribe: '❎ Remover conteúdo'
    }

    function getCard(title, isActive, category, label){
        return {
            "header": {
                "type": "application/vnd.lime.media-link+json",
                "value": {
                    "title": title,
                    "text": '.',
                    "type": "image/jpeg",
                }
            },
            "options": [
                {
                    "label": {
                        "type": "text/plain",
                        "value": isActive ? preferences.unsubscribe : preferences.subscribe
                    },
                    "value": {
                        "type": "application/json",
                        "value": {
                            "type": isActive ? "remove" : "add",
                            "category": category,
                            "label": label
                        }
                    }
                }
            ]
        }
    }

    var preferencesCarousel = {
        "itemType": "application/vnd.lime.document-select+json",
        "items": []
    };

    preferencesCarousel.items.push(
        getCard(preferences.business, isBusiness, 'business', 'negócios')
    );

    preferencesCarousel.items.push(
        getCard(preferences.developer, isDeveloper, 'developer', 'desenvolvimento')
    );

    preferencesCarousel.items.push(
        getCard(preferences.design, isDesign, 'design', 'design')
    );

    preferencesCarousel.items.push(
        getCard(preferences.trend, isTrend, 'trend', 'tendências')
    );

    return preferencesCarousel;
}

run('true', 'true', 'false', 'false');