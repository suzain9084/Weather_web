# Weather Web Page 🌦️

This project is a simple web page that displays the current weather at the user's location. It uses the Geolocation API to determine the user's coordinates and the OpenWeatherMap API to fetch the weather data. The design is clean and responsive, providing an intuitive interface for users to view weather information in real time.

## Features

- 🌍 **Location-based weather**: Automatically fetches the user's location using the Geolocation API.
- ☁️ **Weather data**: Displays current temperature, humidity, wind speed, and general weather conditions using the OpenWeatherMap API.
- 📱 **Responsive design**: Works well on desktop and mobile devices.
- 🔄 **Real-time updates**: Weather data updates when the user refreshes the page or changes location.

## Technologies Used

- **HTML**: For structuring the web page.
- **CSS**: For styling the page and making it responsive.
- **JavaScript**: For fetching the user's location and weather data dynamically.
- **OpenWeatherMap API**: To retrieve current weather conditions.
- **Geolocation API**: To get the user's current location.

## How to Use

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/weather-web-page.git
    ```
2. Navigate to the project folder:
    ```bash
    cd weather-web-page
    ```
3. Open `index.html` in your browser:
    ```bash
    open index.html
    ```
4. Allow location access when prompted by the browser. The page will automatically display the weather at your current location.

## OpenWeatherMap API

You will need an API key from [OpenWeatherMap](https://openweathermap.org/). Replace the default API key in the JavaScript file (`app.js`) with your own key from OpenWeatherMap.

## Example Code (app.js)

```javascript
function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                            `lon=${lon}&appid=YOUR_API_KEY`;

            try {
                let data = await get_data(api_url);
                show_report(data);

            } catch (error) {
                alert('Error fetching data');
            }
        });
    }
}

// Function to fetch the weather data
async function get_data(api_url) {
    const response = await fetch(api_url);
    const data = await response.json();
    return data;
}

// Function to display the weather report on the page
function show_report(data) {
    document.getElementById('temp').innerText = `${data.main.temp} °K`;
    document.getElementById('condition').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
}
