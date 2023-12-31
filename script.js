document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the databases
    Promise.all([
        fetch('pokedex.json').then(response => response.json()),
        fetch('types.json').then(response => response.json()),
        fetch('moves.json').then(response => response.json()),
        fetch('items.json').then(response => response.json())
    ])
    .then(data => {
        const [pokedexData, typesData, movesData, itemsData] = data;
        displayPokedex(pokedexData);
        displayItems(itemsData);
        displayMoves(movesData);
        displayTypes(typesData);
    })
    .catch(error => console.error('Error fetching data:', error));

    function displayPokedex(pokedexData, typesData, movesData, itemsData) {
        const pokedexContainer = document.getElementById('pokedexContainer');

        pokedexData.forEach(pokemon => {
            const card = createPokemonCard(pokemon, typesData);
            pokedexContainer.appendChild(card);
        });
    }

    function createPokemonCard(pokemon, typesData) {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = pokemon.image;
        image.alt = pokemon.name;

        const name = document.createElement('h3');
        name.textContent = pokemon.name;

        const types = document.createElement('p');
        types.innerHTML = `Type: ${pokemon.type.map(type => `<span style="color:${getTypeColor(type, typesData)};">${type}</span>`).join(', ')}`;

        const moves = document.createElement('p');
        moves.textContent = `Moves: ${pokemon.moves.join(', ')}`;

        const item = document.createElement('p');
        item.textContent = `Item: ${pokemon.item}`;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(types);
        card.appendChild(moves);
        card.appendChild(item);

        return card;
    }

    function displayItems(itemsData) {
        const itemsContainer = document.getElementById('itemsContainer');

        itemsData.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name}: ${item.description}`;
            itemsContainer.appendChild(itemElement);
        });
    }

    function displayMoves(movesData) {
        const movesContainer = document.getElementById('movesContainer');

        movesData.forEach(move => {
            const moveElement = document.createElement('div');
            moveElement.textContent = `${move.name} (Type: ${move.type}, Power: ${move.power})`;
            movesContainer.appendChild(moveElement);
        });
    }

    function displayTypes(typesData) {
        const typesContainer = document.getElementById('typesContainer');

        typesData.forEach(type => {
            const typeElement = document.createElement('div');
            typeElement.textContent = `${type.name}: Color - ${type.color}`;
            typesContainer.appendChild(typeElement);
        });
    }

    function getTypeColor(type, typesData) {
        const foundType = typesData.find(t => t.name === type);
        return foundType ? foundType.color : '#000';
    }

    function changeTab(tabId) {
        const tabs = document.querySelectorAll('.content');
        tabs.forEach(tab => {
            tab.style.display = tab.id === tabId ? 'block' : 'none';
        });
    }
});
