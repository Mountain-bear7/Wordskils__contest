//вывод инфы о броне пользователю
console.log(get__params("bill_code"))

async function show__info() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`http://tickets.сделай.site/api/order/${get__params("bill_code")}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        result = JSON.parse(result)
//        console.log(result)
        document.getElementById("concert__code").textContent = `Код заказа: ${get__params("bill_code")}`;
        document.getElementById("concert__price").textContent = `Цена: ${result.data["cost"]}`;
        document.getElementById("ticket__code").textContent = `Код билетов: ${result["ticket"]["ticket_code"]}`;
        document.getElementById("concert__name").textContent = `Название: ${result["ticket"]["name_concert"]}`;
        document.getElementById("concert__place").textContent = `Место: ${result["ticket"]["venue"]}`;
        document.getElementById("concert__date").textContent = `Дата: ${result["ticket"]["date_concert"]}`;
        document.getElementById("concert__time").textContent = `Время: ${result["ticket"]["time_start"]}`;
        document.getElementById("concert__duration").textContent = `Длительность: ${result["ticket"]["duration"]}`;

        const guests__row = document.getElementById("guests__row");
        result.guest.forEach(guest => {
            const customer__data_wrapper = document.getElementsByClassName("customer__data-wrapper");
            if (customer__data_wrapper.length !== 2) {
                customer__data_wrapper[customer__data_wrapper.length-1].innerHTML +=
                    `<div class="customer__data">
                        <input type="text" name="customer__data-name" tabindex="1" placeholder="Имя" disabled value="${guest.first_name}">
                        <input type="text" name="customer__data-surname" tabindex="2" placeholder="Фамилия" disabled value="${guest.last_name}">
                        <input type="tel" name="customer__data-birth" tabindex="3" placeholder="Дата рождения" disabled value="${guest.birth_date}">
                        <input type="tel"  name="customer__data-num" tabindex="4" placeholder="Номер документа" disabled value="${guest.document_number}">
                        <input type="text" placeholder="Ряд" min="1" max="78" disabled value="${guest["place_from"]}">
                    </div>`
            }
            else {
                guests__row.innerHTML +=
                    `<div class="customer__data-wrapper">
                        <div class="customer__data">
                            <input type="text" name="customer__data-name" tabindex="1" placeholder="Имя" disabled value="${guest.first_name}">
                            <input type="text" name="customer__data-surname" tabindex="2" placeholder="Фамилия" disabled value="${guest.last_name}">
                            <input type="tel" name="customer__data-birth" tabindex="3" placeholder="Дата рождения" disabled value="${guest.birth_date}">
                            <input type="tel"  name="customer__data-num" tabindex="4" placeholder="Номер документа" disabled value="${guest.document_number}">
                            <input type="text" placeholder="Ряд" min="1" max="78" disabled value="${guest["place_from"]}">
                        </div>
                    </div>`
            }
            console.log(guest)
        })
    })
    .catch(error => console.log('error', error));
}

show__info();