<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col
        style="margin-top: 16px; flex-direction: column;"
        vs-type="flex"
        v-if="pacientes.length <= 0"
        vs-justify="center"
        vs-align="center"
        vs-w="8"
      >
        <h1 class="title-healthy">No hay pacientes con inconvenientes en la sala</h1>
        <img src="./assets/img/healthy.png" alt="Imagen de saludable" />
      </vs-col>

      <vs-col
        style="margin-top: 16px"
        v-for="(paciente, index) in pacientes"
        v-bind:key="index"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="8"
      >
        <vs-card v-if="((page*2-1<=index && index <= page*2) && (index !== 0))">
          <vs-row style="margin-top: 4px">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="9">
              <line-chart :chart-data="paciente.lineChartData" />
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-w="3">
              <vs-row
                vs-type="flex"
                vs-justify="center"
                class="col-der"
                vs-align="center"
                style="flex-direction: column"
              >
                <vs-divider position="center">
                  <h2>Datos del paciente</h2>
                </vs-divider>
                <vs-row vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    class="text-subtitle"
                    vs-align="center"
                  >Cedula: {{paciente.reporte.cedula}}</vs-col>
                </vs-row>

                <!-- TEMPERATURA -->
                <vs-row vs-type="flex" class="text-header" vs-justify="center">
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <span>Temp. Entrada</span>
                  </vs-col>
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <span>Temp. Salida</span>
                  </vs-col>
                </vs-row>
                <vs-row class="text-important">
                  <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="6"
                  >{{paciente.reporte.tempEntrada.toFixed(2)}} {{paciente.reporte.unidadTemp}}</vs-col>
                  <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="6"
                  >{{paciente.reporte.tempEntrada.toFixed(2)}} {{paciente.reporte.unidadTemp}}</vs-col>
                </vs-row>
                <vs-divider></vs-divider>
                <!-- ------------------------------------------------- -->
                <!-- VOLUMEN GAS -->
                <vs-row vs-type="flex" class="text-header" vs-justify="center">
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <span>Vol. Gas</span>
                  </vs-col>
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <span>Frec. Gas</span>
                  </vs-col>
                </vs-row>
                <vs-row class="text-important">
                  <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="6"
                  >{{paciente.reporte.volGas.toFixed(2)}} {{paciente.reporte.unidadVolumen}}</vs-col>
                  <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="6"
                  >{{paciente.reporte.frecGas.toFixed(2)}} {{paciente.reporte.unidadFrecuencia}}</vs-col>
                </vs-row>

                <!-- ------------------------------------------------- -->
                <!-- VOLUMEN GAS -->

                <vs-divider></vs-divider>
                <vs-row vs-type="flex" class="text-header" vs-justify="center">
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <span>Presion Min.</span>
                  </vs-col>
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <span>Presion Max.</span>
                  </vs-col>
                </vs-row>
                <vs-row class="text-important">
                  <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="6"
                  >{{paciente.reporte.presionMinima.toFixed(2)}} {{paciente.reporte.unidadPresion}}</vs-col>
                  <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="6"
                  >{{paciente.reporte.presionMaxima.toFixed(2)}} {{paciente.reporte.unidadPresion}}</vs-col>
                </vs-row>
                <vs-divider></vs-divider>
                <!------------------------------------------->
                <!-- HUMEDAD MEZCLA-->
                <vs-row vs-type="flex" class="text-header" vs-justify="center">
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <span>Mezcla</span>
                  </vs-col>
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <span>Humedad</span>
                  </vs-col>
                </vs-row>
                <vs-row class="text-important">
                  <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="6"
                  >{{(paciente.reporte.mezcla * 100).toFixed(2)}} {{paciente.reporte.unidadHumedad}}</vs-col>
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    {{(paciente.reporte.humedadAire * 100).toFixed(2)}}
                    {{paciente.reporte.unidadHumedad}}
                  </vs-col>
                </vs-row>
                <vs-divider></vs-divider>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-type="flex"
                    vs-justify="center"
                    vs-align="center">
        <el-pagination
          v-show="pacientes.length > 0"
          layout="prev, pager, next"
          :page-count="numberOfPages"
          :current-page.sync="page"
        ></el-pagination>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import LineChart from "./components/LineChart";
import { REPORTES_URL } from "./config/config";
import { convertirFecha } from "@/utils";

let stompClient = null;

export default {
  name: "App",
  data() {
    return {
      pacientes: [],
      lineChartData: {
        ppm: [],
        fechas: [],
      },
      page: 1,
    };
  },
  components: {
    LineChart,
  },
  computed: {
    numberOfPages() {
      return Math.ceil((this.pacientes.length - 1) / 2);
    },
  },
  methods: {
    modifyChart(reporte) {
      if (this.pacientes.length <= 0) {
        let fecha = this.parseFecha(reporte.time, "LT");
        let paciente = {
          lineChartData: {
            ppm: [reporte.ppm],
            fechas: [fecha],
          },
          reporte,
        };
        this.pacientes[1] = paciente;
      } else {
        let paciente = this.pacientes.findIndex((paciente, index) => {
          if (index !== 0) return paciente.reporte.cedula === reporte.cedula;
          else return false;
        });

        if (paciente !== -1) {
          if (this.pacientes[paciente].lineChartData.ppm.length >= 20) {
            this.pacientes[paciente].lineChartData.ppm.shift();
            this.pacientes[paciente].lineChartData.fechas.shift();
          }

          this.pacientes[paciente].lineChartData.ppm.push(reporte.ppm);
          let fecha = this.parseFecha(reporte.time, "LT");
          this.pacientes[paciente].lineChartData.fechas.push(fecha);
          this.pacientes[paciente].reporte = reporte;
        } else {
          let fecha = this.parseFecha(reporte.time, "LT");
          let paciente = {
            lineChartData: {
              ppm: [reporte.ppm],
              fechas: [fecha],
            },
            reporte,
          };
          this.pacientes.push(paciente);
        }
      }
    },
    parseFecha(unix_timestamp, formato) {
      return convertirFecha(unix_timestamp, formato);
    },
  },
  mounted() {
    this.lineChartData.fechas = [];
    this.lineChartData.ppm = [];
    this.$nextTick(() => {
      console.log("frame");
      let socket = new SockJS(REPORTES_URL);
      stompClient = Stomp.over(socket);
      stompClient.connect({}, (frame) => {
        console.log(frame);
        stompClient.subscribe("/alertas/reportes", (val) => {
          let mensaje = JSON.parse(val.body);
          console.log(mensaje);
          this.modifyChart(mensaje);
        });
      });
    });
  },
};
</script>

<style lang="scss">
$font-family-sans-serif: "Montserrat", Helvetica, Arial, sans-serif !default;
$font-family-serif: Georgia, "Times New Roman", Times, serif !default;
$font-size-base: 14px !default;
$theme-background: #f8f8f8;

html {
  font-size: $font-size-base;
  height: 100%;
  width: 100%;
  line-height: 1.5;
  letter-spacing: 0.01rem;
}

body {
  font-family: $font-family-sans-serif;
  background: $theme-background;
  font-weight: 400;
  overflow-x: hidden;
  max-width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;
}

#app {
  min-height: 100%;
}

.text-important {
  color: #3888fa;
  font-size: 18px;
  font-weight: bold;
}

.text-subtitle {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.vs-divider {
  margin-bottom: 5px !important;
  margin-top: 20px !important;
}

.col-der {
  margin: auto 15px auto 15px !important;
}

.text-header {
  font-size: 14px;
}

.title-healthy {
  color: #5a5e66;
}
</style>