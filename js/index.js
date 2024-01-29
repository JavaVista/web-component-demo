import API from './api-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input-box');
    const submitBtn = document.getElementById('submit-button');
    const listContainer = document.querySelector('.list-container');
    const displayContainer = document.querySelector('.display-container');

    const getResults = async () => {
        if (input.value.trim().length < 1) {
            alert('Input cannot be blank');
            return;
        }
        listContainer.innerHTML = '';

        try {
            const jsonData = await API.fetchCharacter(input.value);
            if (!jsonData || !jsonData.data || !jsonData.data.results) {
                throw new Error('Invalid API response');
            }
            const htmlContent = jsonData.data.results
                .map(
                    element => `
                <div class="card-container">
                    <div class="character-image">
                        <img src="${
                            element.thumbnail['path'] +
                            '.' +
                            element.thumbnail['extension']
                        }" alt="${element.name}"/>
                    </div>
                    <h3 class="character-name">${element.name}</h3>
                    <div class="character-desc">${element.description}</div>
                </div>
            `
                )
                .join('');
            displayContainer.innerHTML = htmlContent;
        } catch (error) {
            console.error('Failed to fetch character:', error);
            // Handle errors (e.g., show a user-friendly message)
        }
    };
    submitBtn.addEventListener('click', getResults);

    input.addEventListener('keyup', async event => {
        listContainer.innerHTML = '';

        if (input.value.trim().length < 1) {
            return;
        }

        try {
            const jsonData = await API.fetchCharactersThatStartWith(
                input.value
            );
            if (!jsonData || !jsonData.data || !jsonData.data.results) {
                throw new Error('Invalid API response');
            }

            jsonData.data.results.forEach(result => {
                let name = result.name;
                let div = document.createElement('div');
                div.style.cursor = 'pointer';
                div.classList.add('autocomplete-items');
                div.setAttribute('onclick', `displayWords('${name}')`);
                let word =
                    name.substring(0, input.value.length) +
                    name.substring(input.value.length);
                div.innerHTML = word;
                listContainer.appendChild(div);
            });
        } catch (error) {
            console.error('Failed to fetch character:', error);
            // Handle errors (e.g., show a user-friendly message)
        }
    });
    window.displayWords = value => {
        input.value = value;
        listContainer.innerHTML = '';
        getResults();
    };
});
