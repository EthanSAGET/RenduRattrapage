async function login() { //Définit la fonction pour se connecter
    let email = document.querySelector('input[name="email"]'); //Récupère l'élément avec le name email
    let password = document.querySelector('input[name="password"]'); //Récupère l'élément avec le name password

    let response = await fetch('http://localhost:3000/auth/login', { //Envoie une requête pour se connecter
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ //Envoie les données de la requête 
            email: email.value,
            password: password.value,

        }),
    });

    if (!response.ok) { //Vérifie si la requête a réussi
        let data = await response.json(); //Récupère le message d'erreur
        alert(data.message);
        return;
    }
    let data = await response.json(); //Récupère le token
    localStorage.setItem('token', data.token); //Stocke le token dans le local storage
    window.location.href = 'profil.html';
}
