document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.querySelector('.show-hide-btn');
    const passwordField = document.querySelector('#senha');

    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.classList.toggle('bx-show');
        this.classList.toggle('bx-hide');
    });
});
