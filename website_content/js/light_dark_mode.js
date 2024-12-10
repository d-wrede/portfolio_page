// Description: JavaScript to toggle between light and dark mode.
document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.querySelector("#theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Apply saved theme (if any)
    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            toggleSwitch.checked = true;
        }
    }

    // Toggle theme on switch change
    toggleSwitch.addEventListener("change", function () {
        if (toggleSwitch.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });

    // Ensure clicking "Hell" or "Dunkel" switches appropriately
    const lightLabel = document.querySelector("#light-label");
    const darkLabel = document.querySelector("#dark-label");

    lightLabel.addEventListener("click", () => {
        if (toggleSwitch.checked) { // Only switch if currently in dark mode
            toggleSwitch.checked = false;
            toggleSwitch.dispatchEvent(new Event("change")); // Trigger the theme change
        }
    });

    darkLabel.addEventListener("click", () => {
        if (!toggleSwitch.checked) { // Only switch if currently in light mode
            toggleSwitch.checked = true;
            toggleSwitch.dispatchEvent(new Event("change")); // Trigger the theme change
        }
    });
});
