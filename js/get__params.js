function get__params(parameter__name) {
    let result = null;
    location.search
    .split("?")
    .forEach(function (item) {
        let tmp = item.split("=");
        if (tmp[0] === parameter__name) result = decodeURIComponent(tmp[1]);
    });
    return result;
}