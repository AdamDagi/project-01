const searchButton = document.querySelector(".search_button");
const inputData = document.querySelector(".search_input");

searchButton.onclick = () => {
    const city = inputData.value;
    window.localStorage.setItem("city", city);
    window.location.href = "http://127.0.0.1:5500/pages/content.html";
};