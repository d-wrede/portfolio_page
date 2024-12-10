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

    // Ensure clicking labels updates the toggle
    const labels = document.querySelectorAll(".theme-label");
    labels.forEach((label) => {
        label.addEventListener("click", () => {
            themeToggle.checked = !themeToggle.checked;
            themeToggle.dispatchEvent(new Event("change")); // Trigger the theme change
        });
    });
});
