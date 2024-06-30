function logout() { //Fonction de déconnexion
    localStorage.removeItem('token'); //Supprime le token du local storage
    window.location.href = 'index.html';
}

