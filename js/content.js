let lat;
let lon;

async function getInitCardinate() {
    const city = window.localStorage.getItem("city");
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ade0fb3053d09af11fa65cf8982f5830`;
    currentNameCity = city;
    try {
        let response = await fetch(url);

        if (response.ok) { 
            const data = await response.json();
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
        } else {
            console.log("Error HTTP: " + response.status);
        };
    } catch(e) {
        console.log(e);
    };
};

async function getBarInfo() {
    try {
        const url = `https://api.tomtom.com/search/2/search/bar.json?key=U4ruU50VG7Jlseidnv57GSrZGPKC3rfo&lat=${lat}&lon=${lon}`;
        let response = await fetch(url);

        if (response.ok) { 
            const data = await response.json();
            
            console.log(data);
        } else {
            alert("Error HTTP: " + response.status);
        };
    } catch(e) {
        console.log(e);
    };
};

const start = async function( ){

    await getInitCardinate();
    await getBarInfo();
}
start();

// U4ruU50VG7Jlseidnv57GSrZGPKC3rfo