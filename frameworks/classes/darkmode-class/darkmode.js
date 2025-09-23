class Darkmode {
    constructor() {
        this.init();
    }
    init() {
        const darkmodeToggle = document.querySelectorAll("[data-darkmode-toggle]");
        const darkmodeElements = document.querySelectorAll("[data-darkmode]");
        darkmodeToggle.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            darkmodeElements.forEach((element) => {
            element.classList.toggle("darkmode");
            });
            // Save preference to localStorage
            if (document.body.classList.contains("darkmode")) {
            localStorage.setItem("darkmode", "enabled");
            } else {
            localStorage.setItem("darkmode", "disabled");
            }
        });
        });

        // Load preference from localStorage
        if (localStorage.getItem("darkmode") === "enabled") {
        darkmodeElements.forEach((element) => {
            element.classList.add("darkmode");
        });
        }
    }
}
customElements.define("sebastian-darkmode", Darkmode) 