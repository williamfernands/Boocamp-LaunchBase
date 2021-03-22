const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

let item;
for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active");
    }
}