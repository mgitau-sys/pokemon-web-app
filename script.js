// fetch ("https://pokeapi.co/api/v2/pokemon/1")
//       .then(response => response.json())
//       .then(data => {
//         console.log(data.sprites.front_default);

//       })
const pokemonContainer = document.getElementById("pokemon-container");
const searchInput = document.getElementById("search");
const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

async function FetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`http error! status: ${response.status}`);
        }
        const data = await response.json();

        for (const pokemon of data.results) {
            const response = await fetch(pokemon.url);
            const pokemonData = await response.json();

            const card = document.createElement("div");
            card.classList.add("pokemon-card");
            card.dataset.name = pokemonData.name;

            const pokemonName = document.createElement("h2");
            pokemonName.textContent = pokemonData.name;
            card.appendChild(pokemonName)

            const pokemonImage = document.createElement("img");
            pokemonImage.src = pokemonData.sprites.front_default;
            card.appendChild(pokemonImage);
            pokemonContainer.appendChild(card);

            const button = document.createElement("button");
            button.textContent = "Show Ability";
            card.appendChild(button);

            button.addEventListener("click", () => {
                const ability = pokemonData.abilities[0].ability.name;

                alert(`I am ${pokemonData.name} and i have ${ability} ability`);
            });

            console.log(pokemonData)
        }
        searchInput.addEventListener("input", () => {
            const searchValue = searchInput.value.toLowerCase();

            const cards = document.querySelectorAll(".pokemon-card");  
            cards.forEach(card => {
                if (card.dataset.name.includes(searchValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
   

    } 
    catch (error) {
        console.error("an error occured while fetching:", error);
    }

}
FetchData();