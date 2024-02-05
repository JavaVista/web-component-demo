class TooltipComponent extends HTMLElement {
    constructor () {
        // instantiate the base class
        super();
        this._tooltipContainer;
        this._tooltipVisible;
        this._showTooltip = this._showTooltip.bind(this);
        this._removeTooltip = this._removeTooltip.bind(this);
        this._tooltipText = 'This is a Marvelous default tooltip text';
        this._tooltipIcon;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: var(--senary-color);
                    color: var(--quinary-color);
                    position: absolute;
                    top: -2em;
                    left: 100%;
                    width: max-content;
                    z-index: 10;
                    padding: 0.5em;
                    border-radius: 0.5em;
                    font-size: 0.8em;
                    box-shadow: 1px 1px 3px rgba(0,0,0,0.26);
                }

                :host {
                    position: relative;
                    display: inline-block;
                    bottom: 1em;
                }

                :host(.important) {
                    color: var(--senary-color);
                    
                }
                span {
                    cursor: help;
                }
            </style>
            <slot>Marvelous placeholder for default text</slot>
            <span>❔</span>
        `;
    }
    connectedCallback() {
        if (this.hasAttribute('text') && this.getAttribute('text') !== '') {
            this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseover', this._showTooltip);
        this._tooltipIcon.addEventListener('mouseout', this._removeTooltip);

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === 'text' && newValue) {
            this._tooltipText = newValue;
        }
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._removeTooltip);
    }

    // static keyword defines properties that can be called without creating an instance
    static get observedAttributes() {
        return ['text'];
    }

    _renderTooltip() {
        if (this._tooltipVisible) {
            this._tooltipContainer = document.createElement('div');
            this._tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(this._tooltipContainer);
        } else {
            if (this._tooltipContainer) {
                this.shadowRoot.removeChild(this._tooltipContainer);
                this._tooltipContainer = null;
            }
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._renderTooltip();
    }


    _removeTooltip() {
        this._tooltipVisible = false;
        this._renderTooltip();
    }
}

/*  Define the custom element and it takes to arguments. The first is the name of the custom element and the second is the class that will be used to create the custom element. Note: name must be in kebab-case (a dash the name comes from a food name in PR will call it pinchos) with no spaces or special characters or single name */
customElements.define('tooltip-component', TooltipComponent);