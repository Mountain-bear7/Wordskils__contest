//функция сортировки массива с json
function sortByProperty(property){
    return function(a,b){
        if(a[property] > b[property])
            return 1;
        else if(a[property] < b[property])
            return -1;
        return 0;
    }
}

//переход на страницу поиска с заданными параметрами
function search__select() {
    const concert__type = document.getElementById("concert__type").value;
    const concert__start = document.getElementById("concert__start").value;
    const concert__finish = document.getElementById("concert__finish").value;

    /* если поля дат заполненые то даелается переход на страницу поиска
    передавая параметры через ?
    название ключа=параметр */
    if (concert__start && concert__finish)
        window.location = `/search.html?type=${concert__type}?start=${concert__start}?finish=${concert__finish}`;
}

//получение концертов с бекенда более подробно ниже
/*сначало удаляем концерты, потом получаем с сервера концерты
отсеиваем те которые не подошли по цене
дальше на основе названия добавляем ссылку на изображение */
async function search__handler() {
    const all__concerts = document.getElementById("founded__concerts");
    all__concerts.innerHTML = `<div class="stocks__items"></div>`
    let concert__type = get__params("type");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let response = await fetch(`http://tickets.сделай.site/api/concert?type=${concert__type}&date1=${get__params("start")}&date2=${get__params("finish")}`, requestOptions)
    let result = await response.json();

    result = result.data["concert"];
    result.sort(sortByProperty("date_concert"))

    const concert__cost__max = document.getElementById("concert__cost__max").value;
    const concert__cost__min = document.getElementById("concert__cost__min").value;

    result.forEach(concert => {
        let concert__price = concert["price"];
        if ((concert__price <= concert__cost__max) && (concert__price >= concert__cost__min)) {
            const concerts__in__block__count = all__concerts.children.length-1;
            const concert__name = concert["name_concert"];
            let concert__image;

            if (concert__name === "Анастасия Волочкова") concert__image = "/image/volockova.jpg";
            else if (concert__name === "Ирина Алегрова") concert__image = "/image/alegrova.jpg";
            else if (concert__name === "Надежда Бабкина") concert__image = "/image/babkina.jpeg";
            else if (concert__name === "Олег Газманов") concert__image = "/image/gazmanov.jpg";
            else if (concert__name === "Сергей Шнуров") concert__image = "/image/shnurov.jpeg";
            else if (concert__name === "Елена Ваенга") concert__image = "/image/elena.jpg";
            else if (concert__name === "Пелагея") concert__image = "/image/pelagea.jpeg";
            else if (concert__name === "Лобода") concert__image = "/image/loboda.jpg";


//                window.location = `/order.html?concert=${concert.name_concert}?date=${concert.date_concert}?time=${concert.time_start}?price=${concert__price}?concert_id=${concert.id}`


            //добавление концерта
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
                        <p>Номер: ${concert["concert_code"]}</p>
                        <p>Дата: ${concert["date_concert"]}</p>
                        <p>Время: ${concert["time_start"]}</p>
                        <p>Стоимость: ${concert["price"]}</p>
                    </div>
                    <button class="stocks__btn">
                        <a href="/order.html?concert=${concert__name}?date=${concert["date_concert"]}?time=${concert["time_start"]}?price=${concert__price}?concert_id=${concert.id}">Купить</a>
                    </button>
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
                                <p>Номер: ${concert["concert_code"]}</p>
                                <p>Дата: ${concert["date_concert"]}</p>
                                <p>Время: ${concert["time_start"]}</p>
                                <p>Стоимость: ${concert["price"]}</p>
                            </div>
                            <button class="stocks__btn">
                                <a href="/order.html?concert=${concert__name}?date=${concert["date_concert"]}?time=${concert["time_start"]}?price=${concert__price}?concert_id=${concert.id}">Купить</a>
                            </button>
                        </div>
                    </div>`
            }
        }
    })
}

//строке мы убираем домен и параметры, оставляя только называние страницы
let page = window.location.href;

page = page.split("/"); //делаю разбивку по /
page = page[page.length-1];// минус один так как все массивы должны начинатся с 0
/* сначала по ? отсеиваю параметры, 0 это выбор первого элемента
то самое название страницы
потом по # это отсеивание якоря */
page = page.split("?")[0].split("#")[0];

//если страница index то вешаем на кнопку обработчик событий
//иначе вызывается функция поиска и два обработчика на минимальную и максимальную стоимость
if (page === "index.html") document.getElementById("search__button").addEventListener("click", search__select);
else {
    search__handler();
    document.getElementById("concert__cost__max").addEventListener("change", search__handler);
    document.getElementById("concert__cost__min").addEventListener("change", search__handler);
}