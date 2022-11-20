async function user__profile() {
    const user__name = document.getElementById("user__name");
    const user__second__name = document.getElementById("user__second__name");
    const user__scores = document.getElementById("user__scores");

    let  myHeaders = new Headers();
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
        user__name.textContent = `Имя: ${result.first_name}`;
        user__second__name.textContent = `Фамилия: ${result.last_name}`;
        user__scores.textContent = `Количество баллов: ${Math.floor(Math.random() * (1000 - 100 + 1) + 100)} баллов`;
    })
    .catch(error => console.log('error', error));
}

async function user__concerts() {
    const all__concerts = document.getElementById("all__concerts");
    let myHeaders = new Headers();
    
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let response = await fetch("http://tickets.сделай.site/user/booking", requestOptions);
    let result = await  response.json();

    result = result.data.items;

    result.forEach(concert => {
        const concerts__in__block__count = all__concerts.children.length-1;
        const concert__name = concert["tickets"]["name_concert"];
        let concert__image;

        if (concert__name === "Анастасия Волочкова") concert__image = "/image/volockova.jpg";
        else if (concert__name === "Ирина Алегрова") concert__image = "/image/alegrova.jpg";
        else if (concert__name === "Надежда Бабкина") concert__image = "/image/babkina.jpeg";
        else if (concert__name === "Олег Газманов") concert__image = "/image/gazmanov.jpg";
        else if (concert__name === "Сергей Шнуров") concert__image = "/image/shnurov.jpeg";
        else if (concert__name === "Елена Ваенга") concert__image = "/image/elena.jpg";
        else if (concert__name === "Пелагея") concert__image = "/image/pelagea.jpeg";
        else if (concert__name === "Лобода") concert__image = "/image/loboda.jpg";


        if (all__concerts.children[concerts__in__block__count].childElementCount !== 3) {
            all__concerts.children[concerts__in__block__count].innerHTML +=
                `<div class="stocks__item">
                <div class="stocks__item-head">
                    <img src="${concert__image}" alt="">
                    <div class="stocks__item-info">
                        <div class="stocks__item-name">${concert__name}</div>
                        <div class="stocks__item-position">Москва</div>
                    </div>
                </div>
                <div class="stocks__item-text">
                    <p>Номер: ${concert.code}</p>
                    <p>Дата: ${concert["tickets"]["date_concert"]}</p>
                    <p>Время: ${concert["tickets"]["time_start"]}</p>
                </div>
                <button class="stocks__btn">Подробнее</button>
            </div>`
        }
        else {
            all__concerts.innerHTML +=
                `<div class="stocks__items">
                    <div class="stocks__item">
                        <div class="stocks__item-head">
                            <img src="${concert__image}" alt="">
                            <div class="stocks__item-info">
                                <div class="stocks__item-name">${concert__name}</div>
                                <div class="stocks__item-position">Москва</div>
                            </div>
                        </div>
                        <div class="stocks__item-text">
                            <p>Номер: ${concert.code}</p>
                            <p>Дата: ${concert["tickets"]["date_concert"]}</p>
                            <p>Время: ${concert["tickets"]["time_start"]}</p>
                        </div>
                        <button class="stocks__btn">Подробнее</button>
                    </div>
                </div>`
        }
    })
}

document.getElementById("logout__button").addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location = "/index.html"
})
user__profile();
user__concerts();