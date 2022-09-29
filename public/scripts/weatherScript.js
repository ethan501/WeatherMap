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
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-100,50], // starting position [lng, lat]
    zoom: 2, // starting zoom
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
      imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      new mapboxgl.Popup()
        .setLngLat(coords)
        .setHTML(`<img src=${imageURL}></img><br /><h3>${location}</h3><p>Currently there is ${weatherDescription} with a temperature of ${temp} degrees celsius.</p>`)
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