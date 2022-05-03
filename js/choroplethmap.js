let map = L.map('map').setView([58.373523, 26.716045], 12)
const osm =
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: 'OpenStreetMap contributors',
})
osm.addTo(map)

addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')

async function addDistrictsGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  L.choropleth(data, {
    valueProperty: 'TOWERS',
    scale: ['#ffffff', '#0066cc'],
    steps: 5,
    mode: 'q',
    style: {
      color: '#cccccc',
      weight: 2,
      fillOpacity: 0.8,
    },
    onEachFeature:popUPinfo; function (feature, layer) {
      layer.bindPopup('Value: ' + feature.properties.TOWERS)
    },
  }).addTo(map)
}

function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12)
}
