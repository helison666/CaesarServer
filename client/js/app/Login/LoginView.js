var LoginView = function (model) {
    var enterCode = 13,
        passwordField,
        escCode = 27,
        loginField,
        submitBtn,
        messageEl,
        form;

    form = document.querySelector('.login');
    loginField = form.querySelector('input[name="login"]');
    passwordField = form.querySelector('input[name="password"]');
    submitBtn = form.querySelector('.submit');

    messageEl = form.querySelector('.message');

    function keyEvent (event) {
        if (event.which === enterCode) {
            if (passwordField.value) {
                login();
            }
        } else if (event.which === escCode) {
            clear();
        }
    }

    this.render = function () {
        document.addEventListener('keydown', keyEvent, true);
        passwordField = form.querySelector('input[name="password"]');

        loginField.addEventListener('input', checkPasswordValue, true);
        passwordField.addEventListener('input', checkPasswordValue, true);
    };

    function checkPasswordValue() {
        if (!passwordField.value || !loginField.value){
            submitBtn.disabled = true;
            submitBtn.removeEventListener('click', login);
        } else {
            submitBtn.disabled = false;    
            submitBtn.addEventListener('click', login, true);
        }
    }

    function login () {
        messageEl.innerText = '';
        if (model.validate(loginField.value.trim(), passwordField.value)) {
            model.sendRequest(function () {
                passwordField.value = '';
                messageEl.innerHTML = 'Incorrect login or password. Please, try again';
            }, {login: loginField.value.trim().toLowerCase(), password: passwordField.value});
        } else {
            messageEl.innerText = 'Incorrect login or password. Please, try again';
            passwordField.value = '';
        }
    }

    function clear () {
        loginField.value = '';
        passwordField.value = '';
        messageEl.innerText = '';
    }
};
