
/*получаем логин и пароль которые ввел пользователь
после чего если номер телефона длинее 7 символов делаем запрос на бекенд
если не пришла ошибка то записываем токен в хранилище и делаем переход в лк
иначе показываем ошибку */
function user__login() {
    const user__phone = document.getElementById("user__phone").value;
    const user__password = document.getElementById("user__password").value;

    if (user__phone.length >= 7) {
        let  myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "phone": user__phone,
            "password": user__password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://tickets.сделай.site/api/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            if (!result.error) {
                let token = result.data;
                localStorage.setItem("token", token["token"])
                window.location = "/profile.html"
            }
            else console.log(result.error);
        })
        .catch(error => console.log('error', error));
    }
    else show__error("Не корректные данные");

}

document.getElementById("user__login_button").addEventListener("click", user__login)