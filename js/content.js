const topBarsConteiner = document.querySelector(".top_bars_conteiner");
const spinner = document.getElementById("spinner");
let lat;
let lon;

async function getInitCardinate() {
    // const city = window.localStorage.getItem("city");
    const queryString = document.location.search;
    const city = queryString.split('=')[1];
    console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ade0fb3053d09af11fa65cf8982f5830`;
    currentNameCity = city;
    try {
        let response = await fetch(url);

        if (response.ok) { 
            const data = await response.json();
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            await mapApi()
        } else {
            console.log("Error HTTP: " + response.status);
        };
    } catch(e) {
        console.log(e);
    };
};

// add map api

async function mapApi(){
//     var mapUrl = `https://api.tomtom.com/map/1/tile/basic/main/20/0/0.pbf?view=Unified&key=IF2Ntj8GbNqk4HGffxVdoEvQM2b2gJgJ`
//     fetch(mapUrl)
//     // .then((res) => res.json())
//     .then((res) => console.log(res))
//     // .then((data) => console.log("map data", data))
const API_KEY = 'IF2Ntj8GbNqk4HGffxVdoEvQM2b2gJgJ';
const city = {lng: lon, lat: lat};
var map = tt.map({
  key: API_KEY,
  container: 'map-div',
  center: city,
  zoom: 10
});
};



// mapApi()

// // const APPLICATION_NAME = 'My Application';
// const APPLICATION_VERSION = '1.0';
 
// tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);


async function getBarInfo() {
    const url = `https://api.tomtom.com/search/2/search/bar.json?key=U4ruU50VG7Jlseidnv57GSrZGPKC3rfo&lat=${lat}&lon=${lon}`;
    spinner.removeAttribute('hidden');
    fetch(url).then(response => response.json())
    .then(data => {
        const results = data.results;
        results.forEach(function(el, index) {
            const freeformAddress = el.address.freeformAddress;
            const name = el.poi.name;
            const url = el.poi.url;
            const categories = el.poi.categories.join(" , ");
            const phone = el.poi.phone;
            

            const barCardEl = document.createElement("div");
            barCardEl.classList.add("top_bar_card");

            if (name) {
                const nameEl = document.createElement("h1");
                nameEl.classList.add("card_content", "bar_name");
                nameEl.innerHTML = name;
                barCardEl.append(nameEl);
            } 
            if (categories) {
                const categoryEl = document.createElement("p");
                categoryEl.classList.add("card_content");
                categoryEl.innerHTML = categories;
                barCardEl.append(categoryEl);
            }
            if (freeformAddress) {
                const adressEl = document.createElement("p");
                adressEl.classList.add("card_content");
                adressEl.innerHTML = `<span class="content_title">Adress: </span> ${freeformAddress}`;
                barCardEl.append(adressEl);
            }
            if (phone) {
                const phoneEl = document.createElement("div");
                phoneEl.classList.add("card_content", "card_content_link");
                phoneEl.innerHTML = `<span class="content_title">Phone: </span><a href="tel:${phone}">${phone}</a>`;
                barCardEl.append(phoneEl);
            }
            if (url) {
                const urlEl = document.createElement("div");
                urlEl.classList.add("card_content", "card_content_link");
                urlEl.innerHTML = `<span class="content_title">WebPage: </span><a href="${url}">${url}</a>`;
                barCardEl.append(urlEl);
            }
            topBarsConteiner.append(barCardEl);
            spinner.setAttribute('hidden', '');
            console.log(data);
        });
    });
};

const start = async function( ){

    await getInitCardinate();
    await getBarInfo();
}
start();