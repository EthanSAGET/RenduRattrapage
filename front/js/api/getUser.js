let token = localStorage.getItem("token"); //Récupère le token

if (!token) {
  window.location.href = "connexion.html";
}


fetch("http://localhost:3000/user/getuser", { 
  headers: {
    "x-access-token": `${token}`, //Envoie le token dans le header de la requête
    "Content-Type": "application/json", 
  },
})
  .then((response) => {
    if (!response.ok) {
      window.location.href = "connexion.html";
    }
    return response.json();
  })
  .then((data) => {
    let user = document.getElementById("user"); //Récupère l'élément avec l'id user
    user.innerHTML = ` 
<label for="name">Nom :</label>
            <input type="text" id="name" name="name" placeholder="${data.name}"required />
          </div>
          <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" placeholder="${data.email}"required />
        
        `; 
  })
  .catch((error) => {
    console.error(error);
  });
