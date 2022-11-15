async function register() {
    const user__name = document.getElementById("user__first__name").value;
    const user__second__name = document.getElementById("user__second__name").value;
    const user__document = document.getElementById("user__document").value;
    const user__phone = document.getElementById("user__phone").value;
    const user__password = document.getElementById("user__password").value;
    const user__password_repeat = document.getElementById("user__password__repeat").value;

    if ((user__password === user__password_repeat) &&
        (user__name.length & user__second__name.length >= 3) &&
        (user__document & user__phone >= 7)) {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "first_name": user__name,
                "last_name": user__second__name,
                "phone": user__phone,
                "document_number": user__document,
                "password": user__password
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let response = await fetch("http://tickets.сделай.site/api/register", requestOptions)
            if (response.status !== 204) show__error("Не корректные данные")
            else window.location = "/login.html";
    }
    else show__error("Не корректные данные")

}

document.getElementById("reg__button").addEventListener("click", register);
