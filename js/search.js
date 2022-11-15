function search__select() {
    const concert__type = document.getElementById("concert__type").value;
    const concert__start = document.getElementById("concert__start").value;
    const concert__finish = document.getElementById("concert__finish").value;

    window.location = `/search.js?type=${concert__type}?start=${concert__start}?finish=${concert__finish}`
}

let page = window.location.href;

page = page.split("/");
page = page[page.length-1];
page = page.split("?")[0].split("#")[0];

if (page === "index.html") document.getElementById("search__button").addEventListener("click", search__select);