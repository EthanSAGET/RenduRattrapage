async function register() { //Définit la fonction pour l'inscription
    let email = document.querySelector('input[name="email"]'); //Récupère l'élément avec le name email
    let password = document.querySelector('input[name="password"]');    //Récupère l'élément avec le name password
    let name = document.querySelector('input[name="name"]');    //Récupère l'élément avec le name name

    let response = await fetch('http://localhost:3000/auth/register', { //Envoie une requête pour s'inscrire
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ //Envoie les données de la requête
            email: email.value,
            password: password.value,
            name: name.value,
        }),
    });

    if (!response.ok) { //Vérifie si la requête a réussi
        let data = await response.json();
        alert(data.message);
        return;
    }


    window.location.href = 'connexion.html'; //Redirige l'utilisateur vers la page de connexion
}
