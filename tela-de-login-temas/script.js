const body = document.body;
const loginBox = document.querySelector(".login-box");
const h1 = document.getElementsByTagName("h1")[0];
const inputs = document.querySelectorAll(".login-input");
const loginButton = document.getElementById("login-button");

function switchTheme() {
    loginBox.classList.toggle("dark-mode");
    body.classList.toggle("dark-mode");
    h1.classList.toggle("dark-mode");
    inputs.forEach(input => {
        input.classList.toggle("dark-mode");
    });
    loginButton.classList.toggle("dark-mode");
}
