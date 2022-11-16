function menu_visibl() {
    const content = document.getElementById("header-content")
    const menu = document.getElementById('menu')

    content.style.visibility = "hidden"
    menu_btn.style.visibility = "hidden"
    menu.style.left = 0
}
function menu_hide() {
    const menu = document.getElementById('menu')
    const content = document.getElementById("header-content")
    
    content.style.visibility = "visible"
    menu_btn.style.visibility = "visible"
    menu.style.left = "-100%"
}


const menu_btn = document.getElementById("menu_btn")
const close_menu_btn = document.getElementById("close_menu_btn")

menu_btn.addEventListener("click", menu_visibl)
close_menu_btn.addEventListener("click", menu_hide)

const slides = document.querySelectorAll('.slide')
slides.forEach((elem) => {

    elem.onclick = () => {
    document.querySelector('.slide.active')?.classList.remove('active')
    elem.classList.add('active')
  }
})

function viewDiv1(){
    const guest__blocks = document.getElementsByClassName("customer__data-wrapper");
    const guest__rows = document.getElementById("guests__rows");
    const guest__blocks__length = guest__blocks.length-1;
    if (guest__blocks[guest__blocks__length].children.length !== 2) {
        guest__blocks[guest__blocks__length].innerHTML +=
            `<div class="customer__data">
                <input type="text" name="customer__data-name" tabindex="1" placeholder="Имя">
                <input type="text" name="customer__data-surname" tabindex="2" placeholder="Фамилия">
                <input type="date" name="customer__data-birth" tabindex="3" placeholder="Дата рождения">
                <input type="tel"  name="customer__data-num" tabindex="4" placeholder="Номер документа">
            <!--<input type="number" name="customer__data-bonus" tabindex="6" placeholder="Количество баллов">-->
                <input type="number" placeholder="Ряд" min="1" max="78">
                <input type="number" placeholder="Место" min="1" max="100">
            </div>`;
    }
    else {
        guest__rows.innerHTML +=
                `<div class="customer__data-wrapper">
                    <div class="customer__data">
                        <input type="text" name="customer__data-name" tabindex="1" placeholder="Имя">
                        <input type="text" name="customer__data-surname" tabindex="2" placeholder="Фамилия">
                        <input type="date" name="customer__data-birth" tabindex="3" placeholder="Дата рождения">
                        <input type="tel"  name="customer__data-num" tabindex="4" placeholder="Номер документа">
                        <!--<input type="number" name="customer__data-bonus" tabindex="6" placeholder="Количество баллов">-->
                        <input type="number" placeholder="Ряд" min="1" max="78">
                        <input type="number" placeholder="Место" min="1" max="100">
                    </div>
                </div>`;
    }
    user()
  };

  function viewDiv2(){
      const  guests = document.getElementsByClassName("customer__data");
      if (guests.length-1 !== 0) guests[guests.length-1].remove();
      user()
  };