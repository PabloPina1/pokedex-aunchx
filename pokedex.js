const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImg3 = document.querySelector('[data-poke-img3]');
const pokeImg2 = document.querySelector('[data-poke-img2]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeMoves = document.querySelector('[data-poke-moves]');

const typeColors = {
    electric: '#ffea70',
    normal: '#b09398',
    fire: '#ff675c',
    water: '#0596c7',
    ice: '#afeafd',
    rock: '#999799',
    flying: '#7ae7c7',
    grass: '#4a9681',
    psychic: '#ffc6d9',
    ghost: '#561d25',
    bug: '#a2faa3',
    dark: '#0a0a0a',
    poison: '#795663',
    ground: '#d2b074',
    dragon: '#da627d',
    steel: '#1d8a99',
    fighting: '#2f2f2f',
    default: '#2a1a1f',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
    .catch(err => renderNot())
}


const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const sprite2 = data.sprites.front_shiny;
    console.log(data)
    const { stats, types, moves } = data;
    
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeImg2.setAttribute('src', sprite2);
    pokeId.textContent = `Nº ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMoves(moves);
    setCardColor(types);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 50%, ${colorOne} 25%)`;
    pokeImg2.style.background = `radial-gradient(${colorTwo} 25%, ${colorOne} 50%)`;
    pokeImg.style.backgroundSize = ` 5px 5px `;
    pokeImg2.style.backgroundSize = ` 5px 5px `;
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '' ;
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    })
}

const renderPokemonMoves = moves => {
    pokeMoves.innerHTML = '';
    moves.forEach(move => {
        const moveElement = document.createElement("p");
        moveElement.textContent = move.move.name;
        pokeMoves.appendChild(moveElement);
    })
}

const renderNot = () => {
    pokeName.textContent = 'NO ENCONTRADO';
    pokeImg.setAttribute('src', 'pokemon-sad.gif')
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.innerHTML = '';
    pokeMoves.innerHTML = '';
}

//evoluciones

