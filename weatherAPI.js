let lon;
let lat;
if (navigator.onLine) {
    getlocation()
}
else {
    let nav = document.body.getElementsByClassName("nav")[0];
    nav.insertAdjacentHTML("afterend", `<div class="no"> <img src="./no-internet-connection-5521509-4610093.webp" alt="" class="noimg"><h1>Please connect your device to internet
    </h1>
    </div>"`)
}


function getlocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(async (position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=5c02e4e35aebbfa74f6fc3f5c02f25ca`;

            try {
                let data = await get_data(api_url);
                show_report(data);

            } catch (error) {
                alert('Error fetching data');
            }
        });
    }
};

async function get_data(api_url) {
    try {
        let response = await fetch(api_url);
        if (!response.ok) {
            alert(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        alert('Error in get_data function:')
    }
}

function secToTime(second) {
    const date = new Date(second * 1000);
    let options = { timeStyle: 'short', hour12: true };
    const time = date.toLocaleTimeString('en-US', options);
    return time;
}

function show_report(data) {

    let icon = data.weather[0].icon;
    let img = document.createElement("img");
    img.className = "img"
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    document.querySelector(".head").insertAdjacentElement("beforeend", img);

    document.querySelector(".dis").textContent = `${data.weather[0].description}`

    document.querySelector(".loc").textContent = `${data.name}`

    let temp = Math.floor(data.main.temp - 273);
    document.querySelector(".temp").textContent = `${temp}°c`


    document.querySelector(".feel").insertAdjacentHTML("beforeend", `<div class="temp"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor"
    class="bi bi-thermometer-snow" viewBox="0 0 16 16">
    <path
        d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5" />

</svg></div>`)



    document.querySelector(".wind").insertAdjacentHTML("afterbegin", `<div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind"
    viewBox="0 0 16 16">
    <path
        d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
</svg></div>`);



    document.querySelector(".sunr").insertAdjacentHTML("afterbegin", `<div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sunrise"
    viewBox="0 0 16 16">
    <path
        d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
</svg></div>`);



    temp = Math.floor(data.main.feels_like - 273);
    document.querySelector(".feel").insertAdjacentText("beforeend", `Feel ${temp}°c`);

    let sunr = secToTime(data.sys.sunrise);
    document.querySelector(".sunr").insertAdjacentText("beforeend", `${sunr}`);


    let speed = Math.round(3.6 * (data.wind.speed));
    document.querySelector(".wind").insertAdjacentText("beforeend", `${speed}Km/s`);

    console.log(data);
}
