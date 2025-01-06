let number = 15;
let starter = 1;

const handleClick = () => {
  const next = document.getElementById("next");
  next.addEventListener("click", () => {
    number += 15;
    starter += 15;
    afficherPokemon();
    filterPokemon();
  });
};

function afficherPokemon() {
  for (let i = starter; i <= number; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#pokemonContainer").innerHTML += `
            <div class="pokemon ${data.types[0].type.name}">
                <div class="imgContainer">
                  <img src="${data.sprites.front_default}" alt="${
          data.species.name
        }" /> 
                </div>
                <div class="info">
                  <h3 class="name">${
                    data.species.name.charAt().toUpperCase() +
                    data.species.name.slice(1)
                  }</h3>
                    <span class="type">Type: <span>${
                      data.types[0].type.name.charAt().toUpperCase() +
                      data.types[0].type.name.slice(1)
                    }</span></span>
                      <div class='hide'>
                        <p>Weight: ${data.weight}</p>
				                <p>Height: ${data.height}</p>
                      </div>
                </div>
            </div>
            `;
        addInformation();
        changerImage();
      });
  }

  filterPokemon();
}

afficherPokemon();
handleClick();

function filterPokemon() {
  const searchInput = document.getElementById("input-pokemon");
  searchInput.addEventListener("input", (event) => {
    const pokemonName = document.querySelectorAll(".name");
    for (let i = 0; i < pokemonName.length; i++) {
      if (
        pokemonName[i].textContent
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        pokemonName[i].parentNode.parentNode.style.display = "block";
      } else {
        pokemonName[i].parentNode.parentNode.style.display = "none";
      }
    }
  });
}

function addInformation() {
  const allPokemons = document.querySelectorAll(".pokemon");

  allPokemons.forEach((pokemon) => {
    pokemon.addEventListener("click", () => {
      const pokemonDetails = pokemon.querySelector(".hide");
    });
  });
}
addInformation();

function changerImage() {
  const imagesPokemon = document.querySelectorAll("img");
  imagesPokemon.forEach((image) => {
    image.addEventListener("click", () => {
      if (image.src.includes("shiny/")) {
        const srcDefault = image.src.replace("shiny/", "");
        image.src = srcDefault;
      } else {
        const imageSrc = image.src;
        const newSrc = imageSrc.split("");
        newSrc.splice(73, 0, "shiny/");
        image.src = newSrc.join("");
      }
    });
  });
}
