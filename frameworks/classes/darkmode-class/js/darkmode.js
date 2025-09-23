class DarkModeElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Default options
        this.isDark = false;
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Bind methods
        this.toggle = this.toggle.bind(this);
        this.handleSystemChange = this.handleSystemChange.bind(this);
    }

    static get observedAttributes() {
        return ['position', 'storage-key', 'size', 'auto-init'];
    }

    connectedCallback() {
        this.render();
        this.init();
    }

    disconnectedCallback() {
        this.mediaQuery.removeEventListener('change', this.handleSystemChange);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    get position() {
        return this.getAttribute('position') || 'top-right';
    }

    get storageKey() {
        return this.getAttribute('storage-key') || 'darkMode';
    }

    get size() {
        return this.getAttribute('size') || 'medium';
    }

    get autoInit() {
        return this.getAttribute('auto-init') !== 'false';
    }

    render() {
        const position = this.position;
        const size = this.size;
        
        // Size configurations
        const sizeConfig = {
            small: { width: '50px', height: '30px', sliderSize: '20px' },
            medium: { width: '60px', height: '40px', sliderSize: '24px' },
            large: { width: '70px', height: '50px', sliderSize: '30px' }
        };
        
        const config = sizeConfig[size] || sizeConfig.medium;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: ${position === 'inline' ? 'inline-block' : 'block'};
                }

                :root {
                    --toggle-bg: #e9ecef;
                    --toggle-active: #007bff;
                    --border-color: #dee2e6;
                }

                .darkmode-toggle {
                    background-color: var(--toggle-bg, #e9ecef);
                    border: 2px solid var(--border-color, #dee2e6);
                    border-radius: 50px;
                    padding: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    width: ${config.width};
                    height: ${config.height};
                    position: ${position === 'inline' ? 'relative' : 'fixed'};
                    ${position === 'top-right' ? 'top: 2rem; right: 2rem;' : ''}
                    ${position === 'top-left' ? 'top: 2rem; left: 2rem;' : ''}
                    ${position === 'bottom-right' ? 'bottom: 2rem; right: 2rem;' : ''}
                    ${position === 'bottom-left' ? 'bottom: 2rem; left: 2rem;' : ''}
                    z-index: 1000;
                    user-select: none;
                }

                .darkmode-toggle:hover {
                    transform: scale(1.05);
                    border-color: var(--toggle-active, #007bff);
                }

                .darkmode-toggle:focus {
                    outline: 2px solid var(--toggle-active, #007bff);
                    outline-offset: 2px;
                }

                .toggle-slider {
                    width: ${config.sliderSize};
                    height: ${config.sliderSize};
                    background-color: var(--toggle-active, #007bff);
                    border-radius: 50%;
                    transition: transform 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: ${parseInt(config.sliderSize) * 0.5}px;
                }

                .darkmode-toggle.dark .toggle-slider {
                    transform: translateX(${parseInt(config.width) - parseInt(config.sliderSize) - 16}px);
                }

                @media (max-width: 768px) {
                    .darkmode-toggle {
                        ${position === 'top-right' ? 'top: 1rem; right: 1rem;' : ''}
                        ${position === 'top-left' ? 'top: 1rem; left: 1rem;' : ''}
                        ${position === 'bottom-right' ? 'bottom: 1rem; right: 1rem;' : ''}
                        ${position === 'bottom-left' ? 'bottom: 1rem; left: 1rem;' : ''}
                    }
                }
            </style>
            
            <button class="darkmode-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
                <div class="toggle-slider">
                    <span class="icon">🌙</span>
                </div>
            </button>
        `;

        this.button = this.shadowRoot.querySelector('.darkmode-toggle');
        this.button.addEventListener('click', this.toggle);
    }

    init() {
        if (!this.autoInit) return;
        
        this.loadSavedPreference();
        this.setupMediaQueryListener();
        this.updateTheme();
        this.updateButton();
    }

    loadSavedPreference() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved !== null) {
            this.isDark = JSON.parse(saved);
        } else {
            this.isDark = this.mediaQuery.matches;
        }
    }

    savePreference() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.isDark));
    }

    setupMediaQueryListener() {
        this.mediaQuery.addEventListener('change', this.handleSystemChange);
    }

    handleSystemChange(e) {
        const saved = localStorage.getItem(this.storageKey);
        if (saved === null) {
            this.isDark = e.matches;
            this.updateTheme();
            this.updateButton();
        }
    }

    toggle() {
        this.isDark = !this.isDark;
        this.savePreference();
        this.updateTheme();
        this.updateButton();
        this.dispatchThemeEvent();
    }

    updateTheme() {
        if (this.isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    }

    updateButton() {
        if (!this.button) return;
        
        const icon = this.shadowRoot.querySelector('.icon');
        if (icon) {
            icon.textContent = this.isDark ? '☀️' : '🌙';
        }
        
        this.button.classList.toggle('dark', this.isDark);
        this.button.setAttribute('aria-pressed', this.isDark);
    }

    dispatchThemeEvent() {
        this.dispatchEvent(new CustomEvent('theme-changed', {
            detail: {
                theme: this.isDark ? 'dark' : 'light',
                isDark: this.isDark
            },
            bubbles: true
        }));
    }

    // Public API methods
    setTheme(theme) {
        this.isDark = theme === 'dark';
        this.savePreference();
        this.updateTheme();
        this.updateButton();
        this.dispatchThemeEvent();
    }

    getCurrentTheme() {
        return this.isDark ? 'dark' : 'light';
    }

    isCurrentlyDark() {
        return this.isDark;
    }
}

// Define the custom element
customElements.define('my-darkmode', DarkModeElement);

// Demo function for testing API
function testAPI() {
    const darkMode = document.querySelector('my-darkmode');
    console.log('Current theme:', darkMode.getCurrentTheme());
    console.log('Is dark:', darkMode.isCurrentlyDark());
    
    // Toggle after 1 second
    setTimeout(() => {
        darkMode.toggle();
        console.log('Toggled! New theme:', darkMode.getCurrentTheme());
    }, 1000);
}

// Listen for theme changes globally
document.addEventListener('theme-changed', (e) => {
    console.log('Global theme change detected:', e.detail);
});