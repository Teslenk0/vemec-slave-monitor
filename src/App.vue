<template>
    <b-row class="w-100 d-flex justify-content-center">
        <b-col md="9" class="mt-4" style="border: 1px solid red">
            <b-row>
                <b-col md="9">
                    <e-charts :options="polar"></e-charts>
                </b-col>
                <b-col md="3">Datos</b-col>
            </b-row>
        </b-col>
    </b-row>

</template>

<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/polar'
    import SockJS from "sockjs-client";
    import {Stomp} from "@stomp/stompjs";
    import {REPORTES_URL} from "./config/config";

    let stompClient = null;

    export default {
        name: "App",
        data() {
            /*const randomData = () => {
                now = new Date(+now + oneDay);
                value = value + Math.random() * 21 - 10;
                return {
                    name: now.toString(),
                    value: [
                        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                        Math.round(value)
                    ]
                };
            }
            var data = [];
            var now = +new Date(1997, 9, 3);
            var oneDay = 24 * 3600 * 1000;
            var value = Math.random() * 1000;
            for (var i = 0; i < 1000; i++) {
                data.push(randomData());
            }*/
            return {
                values: [],
                polar: {
                    title: {
                        text: 'Grafico'
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            params = params[0];
                            var date = new Date(params.name);
                            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: {
                        type: 'time',
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        name: '模拟数据',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: this.values
                    }]
                }
            }
        },
        components: {
            ECharts
        },
        mounted() {
            this.$nextTick(() => {
                console.log("frame");
                let socket = new SockJS(REPORTES_URL);
                stompClient = Stomp.over(socket);
                stompClient.connect({}, (frame) => {
                    console.log(frame);
                    stompClient.subscribe("/alertas/reportes", val => {
                        let mensaje = JSON.parse(val.body);
                        console.log(mensaje);
                    });
                });
            });
        }
    };
</script>

<style>

</style>