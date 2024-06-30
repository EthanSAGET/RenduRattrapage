async function like(button, filmId) {  //Définit la fonction pour liker un film
  let token = localStorage.getItem("token"); //Récupère le token
  if (!token) {
    window.location.href = "connexion.html";
  }


  try {
    const response = await fetch(`http://localhost:3000/films/like/${filmId}`, { //Envoie une requête pour liker le film
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": `${token}`, //Envoie le token dans le header de la requête 
        },
    });

    if (!response.ok) {
        throw new Error(`${response.status}`);
    }

    const result = await response.json(); //Récupère le résultat de la requête
    if (result.likeStatus) { //Met à jour le texte du bouton
        button.textContent = 'Déjà vu';
    } else {
        button.textContent = 'Pas encore vu';
    }

} catch (error) {
    console.error('Erreur:', error);
    alert('Erreur' );
}
}
