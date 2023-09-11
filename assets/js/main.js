const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


function openPokeDialog(idPokeDialog) {
    console.log('idPokeDialog: ', idPokeDialog);

    document.getElementById(idPokeDialog).showModal();
}

function returnStatusValueByName(arrayStatus, status) {
    return arrayStatus.find((item) => (item.stat.name == status)).base_stat;
}

function returnStatClassByValue(value) {
    if (value < 50) {
        return "redline";
    } else {
        return "greenline";
    }
}

function returnStyleStatusBarByValue(value) {
    if (!value) return '';
    if (value < 50) {
        return "width: " + value + "%;";
    } else {
        return "width: " + value + "%;";
    }
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <button id="btnOpenPokeDialog${pokemon.number}" class="btnOpenPokeDialog" onclick="openPokeDialog('pokeDialog${pokemon.number}')">
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </button>

            <dialog id="pokeDialog${pokemon.number}" class="pokedialog pokedialog-${pokemon.type}" onclick="return false;">
                <span class="pokedialog-span-close">
                    <button onclick="this.parentNode.parentNode.close()"> Close </button>
                </span>

                <section class="pokedialog-content">
                    <div class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>

                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                    </div>
                </section>
                <section class="pokedialog-content-stats">
                    <div class="pokedialog-stats-about">
                        <h3>About</h3>
                        <ol>
                            <li>Heigth: ${(pokemon.detail.height / 10)} m</li>
                            <li>Weigth: ${(pokemon.detail.weight / 10)} kg</li>
                            <li>Abilities: ${pokemon.detail.abilities.map((item) => item.ability.name).join(', ')}</li>
                        </ol>
                    </div>
                    <div class="pokedialog-stats-status">
                        <h3>Base Stats</h3>
                        <ol>
                            <li>Hp (${returnStatusValueByName(pokemon.detail.stats, "hp")})</li>
                            <li class="statusbar"><div class="${returnStatClassByValue(returnStatusValueByName(pokemon.detail.stats, "hp"))}" style="${returnStyleStatusBarByValue(returnStatusValueByName(pokemon.detail.stats, "hp"))}"></div></li>
                            <li>Attack (${returnStatusValueByName(pokemon.detail.stats, "attack")})</li>
                            <li class="statusbar"><div class="${returnStatClassByValue(returnStatusValueByName(pokemon.detail.stats, "attack"))}" style="${returnStyleStatusBarByValue(returnStatusValueByName(pokemon.detail.stats, "attack"))}"></div></li>
                            <li>Defense (${returnStatusValueByName(pokemon.detail.stats, "defense")})</li>
                            <li class="statusbar"><div class="${returnStatClassByValue(returnStatusValueByName(pokemon.detail.stats, "defense"))}" style="${returnStyleStatusBarByValue(returnStatusValueByName(pokemon.detail.stats, "defense"))}"></div></li>
                            <li>Sp. Attack (${returnStatusValueByName(pokemon.detail.stats, "special-attack")})</li>
                            <li class="statusbar"><div class="${returnStatClassByValue(returnStatusValueByName(pokemon.detail.stats, "special-attack"))}" style="${returnStyleStatusBarByValue(returnStatusValueByName(pokemon.detail.stats, "special-attack"))}"></div></li>
                            <li>Sp. Defense (${returnStatusValueByName(pokemon.detail.stats, "special-defense")})</li>
                            <li class="statusbar"><div class="${returnStatClassByValue(returnStatusValueByName(pokemon.detail.stats, "special-defense"))}" style="${returnStyleStatusBarByValue(returnStatusValueByName(pokemon.detail.stats, "special-defense"))}"></div></li>
                            <li>Speed (${returnStatusValueByName(pokemon.detail.stats, "speed")})</li>
                            <li class="statusbar"><div class="${returnStatClassByValue(returnStatusValueByName(pokemon.detail.stats, "speed"))}" style="${returnStyleStatusBarByValue(returnStatusValueByName(pokemon.detail.stats, "speed"))}"></div></li>
                        </ol>
                    </div>
                </section>
            </dialog>
        </li>
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        if (pokemonList) pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
        offset += limit
        const qtdRecordsWithNexPage = offset + limit

        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            loadPokemonItens(offset, limit)
        }
    })
}