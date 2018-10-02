/**
* All input variables needs to be passed as function param;
* Objects received as param needs to be parsed. Ex.: JSON.parse(inputVariable1);
* Objects returned needs to be stringfied. Ex.: JSON.stringify(inputVariable1);
**/
function run(categoriaConteudo) {
    
    let result = '';

    switch(categoriaConteudo){
        case 'negocios':
            result = 'chatbots';
            break;
        case 'desenvolvimento':
            result = '4devs';
            break;
        case 'design':
            result = '4designers';
            break;
        case 'tendencias':
            result = 'one-step-beyond';
            break;
    }
    
    return result; //Return value will be saved as "Return value variable" field name
}