//Traitement initial
function init() {
    menu('Accueil');

    active();
}

//Remplit l'article avec les données du serveur
function menu(url) {
    fetch(`http://localhost:4200/${url}`)
        .then(reponse => reponse.text())
        .then(function(html){
            document.querySelector('[data-js-article]').innerHTML = html;
        });
}

//Ajoute la classe "active"(couleur différente) en cliquant sur un lien du menu
function active(){
    let liens = document.querySelectorAll('.nav-link');

    for(let lien of liens) {
        lien.addEventListener('click', function(){
            let lienActif = document.querySelector(".active");
            lienActif.classList.remove("active");
            this.classList.add("active");
        })
    }
}