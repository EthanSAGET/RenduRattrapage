const API_KEY = "00a9da85d2cbe5645149bedd416ed927"; // API key
const CATEGORIES = { // Catégories de films
  Action: 28, 
  Comedy: 35,
  Drama: 18,
  Horror: 27,
};

async function fetchFilms() { //Fonction pour récupérer les films
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=fr-FR&page=1` //Envoie une requête pour récupérer les films
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); //Récupère les données de la requête
    return data.results.slice(0, 100); //Récupère les 100 premiers films
  } catch (error) {
    console.error("Fetch error: ", error);
    return;
  }
}

function sortFilmsByCategory(films) { //Fonction pour trier les films par catégorie
  const sortedFilms = {}; 

  for (const [category, id] of Object.entries(CATEGORIES)) { //Pour chaque catégorie de films on récupère l'id de la catégorie
    sortedFilms[category] = films.filter((film) => film.genre_ids.includes(id)); //Filtre les films par catégorie avec l'id de la catégorie 
  }
 
  return sortedFilms; //Retourne les films triés par catégorie
}

async function displayFilms() {
  const container = document.getElementById("film_container"); 
  const swiperContainer = document.querySelector(".mySwiper");

  const films = await fetchFilms(); //Récupère les films
  const sortedFilms = sortFilmsByCategory(films); //Trie les films par catégorie

  let htmlContent = "";
  let swiperContent = "";

  for (const [category, films] of Object.entries(sortedFilms)) { //Pour chaque catégorie de films on récupère les films
    let categoryContent = `<div class="category">
                                <h2>${category}</h2>
                                <ul class="film_category">`;

    films.forEach((film) => { //Pour chaque film on affiche les informations du film
      categoryContent += `
                <li class="film" data-id=${film.id}>
                    <img src='https://image.tmdb.org/t/p/w200${film.poster_path}' alt="${film.title}"/>
                    <h3>${film.title}</h3>
                    <div class="btn_film">
                        <button class="btn more-info">Voir plus</button>
                        <button class="btn add-to-list">Pas encore vu</button>
                    </div>
                </li>`;
    });

    categoryContent += "</ul></div>";
    htmlContent += categoryContent; //Ajoute les films dans la page

    films.slice(0, 3).forEach((film) => { //Pour chaque film on affiche les informations du film dans le slider
      swiperContent += `
                <swiper-slide>
                    <img src='https://image.tmdb.org/t/p/w200${film.poster_path}' alt="${film.title}"/>
                    <div class="film_infos">
                        <h2>${film.title}</h2>
                        <p class="film_overview">${film.overview}</p>
                        <p>Sortie: ${film.release_date}</p>
                        <p>Note: ${film.vote_average}/10</p>
                        <p>Votes: ${film.vote_count}</p>
                        <p>Popularité: ${film.popularity}</p>
                    </div>
                </swiper-slide>`;
    });
  }


  container.innerHTML = htmlContent;
  swiperContainer.innerHTML = swiperContent;

  const buttons = document.querySelectorAll(".btn.add-to-list"); //Récupère les boutons pour liker un film 
  buttons.forEach((button) => { //Pour chaque bouton on ajoute un événement au clic
    button.addEventListener("click", () => { //Lorsque l'utilisateur clique sur le bouton
      const filmId = button.closest(".film").dataset.id; //Récupère l'id du film
      like(button, filmId); //Appelle la fonction pour liker le film
    });
  });


  new Swiper(".mySwiper", { //Initialise le slider
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });
}

displayFilms(); //Affiche les films
