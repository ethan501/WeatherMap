const Http = new XMLHttpRequest();

// navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
//   enableHighAccuracy: true
// })

// function successLocation(position) {
//   console.log(position)
//   // setupMap([position.coords.longitude, position.coords.latitude])
// }

// function errorLocation() {

// }

mapboxgl.accessToken = 'pk.eyJ1IjoiamV0cHJvIiwiYSI6ImNrdDI5bnVwejBuMHIzMnA4ZWh1endyazEifQ.nD0Hsw-eP3f8h1HDDMEGVg';


const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/dark-v10', // style URL
  center: [-100, 50], // starting position [lng, lat]
  zoom: 4, // starting zoom
  projection: 'globe' // display the map as a 3D globe



});
map.on('style.load', () => {
  map.setFog({}); // Set the default atmosphere style
});



map.on('click', function (e) {


  const apiKey = "f242e236badcc733211fd8c7ea29cbca"

  const coords = e.lngLat
  const lng = coords.lng
  const lat = coords.lat
  const units = "metric"
  let temp = ""
  let icon = ""
  let imageURL = ""
  let location = ""


  console.log(coords.lng, coords.lat)


  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&appid=${apiKey}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      console.log(weatherData)
      temp = weatherData.main.temp;
      weatherDescription = weatherData.weather[0].description;
      icon = weatherData.weather[0].icon;
      location = weatherData.name
      new mapboxgl.Popup()
        .setLngLat(coords)
        .setHTML(`
          <h3>${location}</h3>
          <div class="popup-header">
          <div style='width: 72px; height: 72px; margin-right: 12px;'>${getIcon(icon)}</div>
            <div>
              <div class="popup-temp">${temp.toFixed()}<span style="font-size: 16px; color: lightgrey; display: inline-block; transform: translateY(-11px)">&#176;C</span></div>  
              <div class="popup-description">${weatherDescription}</div>
            </div>
          </div>
          <p>Currently there is ${weatherDescription} with a temperature of ${temp.toFixed(1)} C</p>
        `)
        .addTo(map);
    });

});

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
  };
}


function getIcon(id) {
  switch (id) {
    case '01d':
      return `<img src="../icons/clear-day.svg" />`
    case '01n':
      return `<img src="../icons/clear-night.svg" />`

    case '02d':
      return `<img src="../icons/partly-cloudy-day.svg" />`
    case '02n':
      return `<img src="../icons/partly-cloudy-night.svg" />`

    case '03d':
      return `<img src="../icons/overcast-day.svg" />`
    case '03n':
      return `<img src="../icons/overcast-night.svg" />`

    case '04d':
    case '04n':
      return `<img src="../icons/overcast.svg" />`

    case '09d':
      return `<img src="../icons/partly-cloudy-day-drizzle.svg" />`
    case '09n':
      return `<img src="../icons/partly-cloudy-night-drizzle.svg" />`

    case '10d':
    case '10n':
      return `<img src="../icons/rain.svg" />`

    case '11d':
    case '11n':
      return `<img src="../icons/thunderstorms.svg" />`

    case '13d':
    case '13n':
      return `<img src="../icons/snow.svg" />`

    case '50d':
    case '50n':
      return `<img src="../icons/fog.svg" />`

    default:
      new Error("You broke it!")
  }
}