document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle'); //Récupère le bouton pour afficher le menu
    const menu = document.querySelector('.menu'); //Récupère le menu
    
    menuToggle.addEventListener('click', function() { //Ajoute un événement au clic sur le bouton
        menu.classList.toggle('active'); //Affiche ou cache le menu
    });
});
