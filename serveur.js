const http = require("http");
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let repImages = /\/images/;
    let repCSS = /\/css/;
    let urls = ['/Accueil', '/Fabrication', '/Utilisation', '/Elimination', '/Solution'];

    switch(true) {
        
        case req.url == '/': //index
            getFichier('/index.html', 'html');
            break;

        case urls.includes(req.url): //pages
            getFichier(`/client/pages/${req.url}.html`, 'html');
            break;
        
        case req.url == '/js': //javascript
            getFichier(`/client/js/projet1.js`, 'javascript');
            break;
        
        case repCSS.test(req.url): //css
            getFichier(`/client${req.url}`, 'css');
            break;
        
        case repImages.test(req.url): //images
            let fichierImg = fs.readFileSync(path.join(__dirname + `/client${req.url}`));

            res.writeHead(200, {'Content-Type': 'images/png' });
            res.end(fichierImg, 'binary');
            break;
        default:
            res.write("<p>Erreur: Cette page n'existe pas</p>");
            res.end();
    }

    //Retourne ce que contient le fichier avec le header approprié
    function getFichier(chemin, contentType) {
        fs.readFile(path.join(__dirname + chemin), "utf8", (err, data) => {   
            if (err)
                throw err;
            
            res.writeHead(200, { 'Content-Type': `text/${contentType}` });
            res.write(data);
            res.end();
        });
    }
    
}).listen(4200);