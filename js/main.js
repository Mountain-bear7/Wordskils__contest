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
    document.getElementById("customer-form2").style.display = "block";
  };

  function viewDiv2(){
    document.getElementById("customer-form2").style.display = "none";
  };