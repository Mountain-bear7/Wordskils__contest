const form = {
    tel: document.getElementById('telephone'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    button: document.querySelector('.button')
}

function changesInput(e, name) {
    const { value } = e.target
    if (value) {
        form[name].classList.add('filled')
    } else {
        form[name].classList.remove('filled')
    }
}

    form.tel.oninput = (e) => changesInput(e, 'tel')
    form.email.oninput = (e) => changesInput(e, 'email')
    form.password.oninput = (e) => changesInput(e, 'password')