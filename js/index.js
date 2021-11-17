const searchButton = document.querySelector(".search_button");
const inputData = document.querySelector(".search_input");
const headerEl = document.querySelector(".sprint");

searchButton.onclick = () => {
    const city = inputData.value;
    // window.localStorage.setItem("city", city);
    window.location.replace("./content.html?city=" + city);
};

headerEl.onclick = () => {
    localStorage.removeItem("")
}