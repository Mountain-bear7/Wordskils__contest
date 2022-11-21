//выводит на html данные
//выводим инфу о концерте взятую из ссылки
//потом выводим инфу о самом пользвателе взятую через запрос по токену
function order() {
    document.getElementById("concert__name").textContent = `Название: ${get__params("concert")}`;
    document.getElementById("concert__date").textContent = `Дата: ${get__params("date")}`;
    document.getElementById("concert__time").textContent = `Время: ${get__params("time")}`;
    document.getElementById("concert__price").textContent = `Цена: ${get__params("price")}`;
}

function user() {
    const first__user = document.getElementsByClassName("customer__data")[0];
    console.log(first__user);

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://tickets.сделай.site/user", requestOptions)
    .then(response => response.text())
    .then(result => {
        result = JSON.parse(result);

        first__user.children[0].value = result.first_name;
        first__user.children[1].value = result.last_name;
        first__user.children[3].value = result.document_number;

        first__user.children[0].disabled = true;
        first__user.children[1].disabled = true;
        first__user.children[2].disabled = true;
        first__user.children[3].disabled = true;
    })
    .catch(error => console.log('error', error));
}

if (!localStorage.getItem("token")) window.location = "/login.html"
order()
user()

let concert__code = "";
document.getElementById("order__button").addEventListener("click", async () => {
    const guests__massive = [];
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    myHeaders.append("Content-Type", "application/json");
    //получаем всех гостей добавляем их в массив после чего регистрируем их на концерт а потом сразу запрос на регистрацию
    const guests = document.getElementsByClassName("customer__data");
    for (let i=0; i < guests.length; i++) {
        if ((guests[i].children[0].value.length & guests[i].children[1].value.length >=3) &&
        (guests[i].children[3].value >= 7)) {
            guests__massive.push({
                "first_name": guests[i].children[0].value,
                "last_name": guests[i].children[1].value,
                "birth_date": "2004-11-17",
                "document_number": guests[i].children[3].value
            })
        }
        else {
            show__error("Некоректные данные")
            break
        }
    }
    let raw = JSON.stringify({
        "concert": {
            "id": get__params("concert_id"),
            "date": get__params("date")
        },
        "guest": guests__massive
    });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    if (concert__code.length === 0) {
        await fetch("http://tickets.сделай.site/api/order", requestOptions)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            concert__code = result.data.code;
        })
        .catch(error => console.log('error', error));
    }

    requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    //получаем инфу о бронировании берем от туда гостей
    //после чего находим данные этого гостя в форме на сайте
    //указываем ему место и делаем запрос на это место
    //если вернулась ошибка то показываем ошибку
    await fetch(`http://tickets.сделай.site/api/order/${concert__code}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        result = JSON.parse(result)["guest"];
        result.forEach(guest => {
            for (let i=0; i < guests.length; i++) {
                if (guests[i].children[3].value === guest.document_number) {
                    if ((guests[i].children[4].value.length >=2) && (guests[i].children[5].value.length >= 0)) {
                        let myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");

                        let raw = JSON.stringify({
                            "guest_id": guest.id,
                            "seat": `${guests[i].children[4].value} row ${guests[i].children[5].value} seat`
                        });

                        let requestOptions = {
                            method: 'PATCH',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch(`http://tickets.сделай.site/api/order/${concert__code}/seat`, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            result = JSON.parse(result)
                            if (result.error) show__error("Измените места у оставшихся гостей")
                            else guests[i].remove()
                            console.log(guests.length)
                            if (guests.length === 0) window.location = `/order_management.html?bill_code=${concert__code}`
                        })
                        .catch(error => console.log('error', error));
                        break
                    }
                    else show__error("Измените места у оставшихся гостей")
                }
            }
        })
    })
    .catch(error => console.log('error', error));
})
