import API from '../js/api-service.js';
class SearchInputComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Use the connectedCallback to set up the initial state and event listeners
    connectedCallback() {
        this.render();
        // Event listeners for the search button click and input keyup
        this.shadowRoot.querySelector('#submit-button').addEventListener('click', () => this.search());
        this.shadowRoot.querySelector('#input-box').addEventListener('keyup', () => this.autocomplete());
    }

    // Use getters and setters to reflect the attribute to a property
    get value() {
        return this.getAttribute('value');
    }


    set value(newValue) {
        const inputBox = this.shadowRoot.querySelector('#input-box');
        if (inputBox && newValue !== inputBox.value) {
            inputBox.value = newValue; 
            this.setAttribute('value', newValue);
        }
    }
    

    search() {
        // Dispatches a 'search' event with the current input value
        const inputValue = this.shadowRoot.querySelector('#input-box').value; 
        this.clearAutocomplete();
        this.dispatchEvent(new CustomEvent('search', {
            detail: inputValue,
            bubbles: true,
            composed: true
        }));
    }

    async autocomplete() {
        const input = this.shadowRoot.querySelector('#input-box').value.trim();
        const listContainer = this.shadowRoot.querySelector('.list-container');
        listContainer.innerHTML = ''; // Clear existing suggestions

        if (input.length < 1) {
            return;
        }

        try {
            const jsonData = await API.fetchCharactersThatStartWith(input);
            if (!jsonData || !jsonData.data || !jsonData.data.results.length) {
                listContainer.innerHTML = '<div class="autocomplete-items">No characters found</div>';
                listContainer.style.display = 'block';
                return;
            }

            jsonData.data.results.forEach(result => {
                let name = result.name;
                let div = document.createElement('div');
                div.className = 'autocomplete-items';
                div.textContent = name;
                div.addEventListener('click', () => {
                    this.shadowRoot.querySelector('#input-box').value = name;
                    this.clearAutocomplete()
                    this.search();
                });
                listContainer.appendChild(div);
            });
            if (jsonData.data.results.length > 0) {
                listContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Failed to fetch autocomplete suggestions:', error);
        }
    }

    clearAutocomplete() {
        const listContainer = this.shadowRoot.querySelector('.list-container');
        if (listContainer) {
            listContainer.innerHTML = '';
            listContainer.style.display = 'none';
        }
    }

    // Re-render the inner HTML of the shadow DOM when needed
    render() {
        this.shadowRoot.innerHTML = `
            <style>
            .input-container {
                position: relative;
                display: flex;
                gap: 1em;
                background-color: var(--quaternary-color);
                border-radius: 0.5em;
                padding: 1em;
            }
            .search-input {
                flex-grow: 1;
                padding: 0.5em;
                border: none;
                border-radius: 0.5em;
                color: var(--quinary-color);
                background-color: transparent; 
            }
            .search-input:focus {
                outline: 0.125em solid var(--secondary-color);
            }
            #submit-button {
                background-color: var(--secondary-color);
                border: none;
                border-radius: 0.5em;
                color: var(--quinary-color);
                cursor: pointer;
                padding: 0.5em 1em;
            }
            .list-container {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--quaternary-color);
                color: var(--quinary-color);
                z-index: 10;
                border-radius: 0.5em;
                overflow: hidden;
                display: none;
            }
            .autocomplete-items {
                padding: 0.5em;
                cursor: pointer;
                text-align: left;
            }
            .autocomplete-items:hover {
                background-color: var(--secondary-color);
            }
            </style>
            <div class="input-container">
                <input type="text" class="search-input" placeholder="Search character" value="${this.value || ''}" id="input-box" />
                <button id="submit-button">Submit</button>
                <div class="list-container"></div>
            </div>
        `;
    }

    // Reflect attribute changes to the property
    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && newValue !== oldValue) {
            this.value = newValue;
        }
    }
}
customElements.define('search-input-component', SearchInputComponent);
