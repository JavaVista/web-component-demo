class CharacterCardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    set character(data) {
        // Sets the character information and renders the card
        if (data) {
            this.render(data);
        }
    }

    render(data) {
        // Renders the character card with the provided data
        this.shadowRoot.innerHTML = `
            <style>
            .card-container {
                /* Container styling */
                background-color: var(--tertiary-color);
                border-radius: 1em;
                color: var(--quinary-color);
                padding: 2em;
                text-align: center;
            }
            .character-image {
                background-color: var(--quinary-color);
                padding: 0.5em;
                border-radius: 50%;
                width: 9.37em;
                height: 9.37em;
                margin: auto;
                overflow: hidden;
            }
            .character-image img {
                width: 100%;
                height: auto;
                object-fit: cover;
                border-radius: 50%;
            }
            .character-name {
                margin-top: 0.5em;
                font-weight: bold;
                font-size: 1.5em;
                color: var(--quinary-color);
                text-transform: uppercase;
                text-align: center;
            }
            .character-desc {
                margin-top: 1em;
                font-size: 1em;
                color: var(--senary-color);
                text-align: justify;
            }
            </style>
            <div class="card-container">
                <div class="character-image">
                    <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="${data.name}" />
                </div>
                <h3 class="character-name">${data.name}</h3>
                <div class="character-desc">${data.description}</div>
            </div>
        `;
    }

    setError(message) {
        this.shadowRoot.innerHTML = `
            <div class="error-message">${message}</div>
        `;
    }
}

customElements.define('character-card-component', CharacterCardComponent);
