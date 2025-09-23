class BurgerMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default options
        this.isOpen = false;

        // Bind methods
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        // Create the HTML structure
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                    display: inline-block;
                }

                .burger-menu {
                    width: 40px;
                    height: 30px;
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    z-index: 1000;
                }

                .burger-menu div {
                    width: 100%;
                    height: 4px;
                    background-color: black;
                    border-radius: 2px;
                    transition: all 0.3s ease;
                }

                .burger-menu.open div:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .burger-menu.open div:nth-child(2) {
                    opacity: 0;
                }

                .burger-menu.open div:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -5px);
                }

                .menu-items {
                    position: absolute;
                    top: 35px;
                    left: 0;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    min-width: 200px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                    z-index: 999;
                }

                .menu-items.open {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .menu-items ::slotted(*) {
                    display: block;
                    padding: 12px 16px;
                    text-decoration: none;
                    color: #333;
                    border-bottom: 1px solid #eee;
                    transition: background-color 0.2s ease;
                }

                .menu-items ::slotted(*:last-child) {
                    border-bottom: none;
                }

                .menu-items ::slotted(*:hover) {
                    background-color: #f5f5f5;
                }
            </style>

            <div class="burger-menu">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="menu-items">
                <slot></slot>
            </div>
        `;

        // Add event listener
        const burgerMenu = this.shadowRoot.querySelector('.burger-menu');
        burgerMenu.addEventListener('click', this.toggleMenu);
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        const burgerMenu = this.shadowRoot.querySelector('.burger-menu');
        if (this.isOpen) {
            burgerMenu.classList.add('open');
        } else {
            burgerMenu.classList.remove('open');
        }
    }

    closeMenu() {
        this.isOpen = false;
        const burgerMenu = this.shadowRoot.querySelector('.burger-menu');
        burgerMenu.classList.remove('open');
    }
}

customElements.define('burger-menu', BurgerMenu);