var moment = require("moment");


const axios = require("axios");

const reportesApi = "http://localhost:8090/api/v1/reporte"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function convertirFecha(unix_timestamp, formato) {
  moment.locale('es');
  return moment(unix_timestamp).format(formato);
}


async function script() {

  let data = {}

  let alertas = ["ROJO", "NARANJA", "AMARILLO", "VERDE"];
  let bateria = false;
  let nivelBateria = null;
  while (true) {

    /*bateria = !bateria;
    if(bateria){
      nivelBateria = Math.floor(Math.random() * (+100 - +0)) + +0;
    }
    else{
      nivelBateria = null;
    }*/

    data = {
      presionMaxima: parseFloat(Math.random().toFixed(2) * 30),
      presionMinima:  parseFloat(Math.random().toFixed(2) * 2),
      volGas:  parseFloat(Math.random().toFixed(2)),
      frecGas:  parseFloat(Math.random().toFixed(2)),
      mezcla:  parseFloat(Math.random().toFixed(2)),
      humedadAire:  parseFloat(Math.random().toFixed(2)),
      tempEntrada:  parseFloat(Math.random().toFixed(2) * 50),
      tempSalida:  parseFloat(Math.random().toFixed(2) * 50),
      presionEntrada:  parseFloat(Math.random().toFixed(2) * 50),
      presionSalida:  parseFloat(Math.random().toFixed(2) * 50),
      alerta: alertas[(Math.random().toFixed(0) - 1) * 4],
      time: convertirFecha(new Date(), "YYYY-MM-DD HH:mm:ss"),
      //cedula: Math.floor(Math.random() * 3).toString(),
      cedula:491,
      unidadPresion: "mBar",
      unidadTemp: "°C",
      unidadHumedad: "%",
      unidadFrecuencia: "v/min",
      unidadVolumen: "cc",
      ppm:60,
      //ppm: Math.floor(Math.random() * (+250 - +30)) + +30,
      bateria:false,
      nivelBateria:null
    }
    axios.post(reportesApi, data).then(res => console.log("se acaba de ingresar un reporte")).catch(err => console.log(err))

    // espera 1 sec
    await sleep(500);
  }
}

script();
