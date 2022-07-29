const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "ip-geolocation-and-threat-detection.p.rapidapi.com",
  },
};
// url: 'https://ip-geolocation-and-threat-detection.p.rapidapi.com/54.85.132.205',

const fetchIpInfo = (ip) => {
  return fetch(
    `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`,
    OPTIONS
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

const $ = (selector) => document.querySelector(selector);

const formulario = $("#formulario");
const input = $("#input");
const submit = $("#submit");
const resultados = $("#resultados");
const resultadosIP = $("#resultados-ip");
const buscar = $("#buscar");
const script = $("#script-callback");
let LONGITUD;
let LATITUD;

console.log({
  formulario,
  input,
  submit,
  resultados,
  resultadosIP,
  script,
});

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { value } = input;
  if (!value) {
    console.log("Invalid");
    return;
  }
  submit.setAttribute("disabled", "");
  submit.setAttribute("aria-busy", "true");
  const ipInfo = await fetchIpInfo(value);

  if (ipInfo) {
    resultados.innerHTML = JSON.stringify(ipInfo, null, 5);
     LATITUD = ipInfo.location.latitude;
     LONGITUD = ipInfo.location.longitude;
  }
  submit.removeAttribute("disabled", "");
  submit.removeAttribute("aria-busy", "true");

  console.log({
    LATITUD,
    LONGITUD,
  });
  initMap(LATITUD, LONGITUD);
});



buscar.addEventListener("click", (event) => {
  fetchIP();
});

//let ip;
function fetchIP() {
  console.log("Ejecutando");
  fetch("https://api.ipify.org/?format=json")
    .then((results) => results.json())
    .then((data) => input.value=data.ip);
    
}

let map;
function initMap(lat = 19.50059, lng = -99.08867) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat, lng },
    zoom: 15,
  });
  let marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
  });
}