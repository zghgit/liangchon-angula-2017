/**
 * Created by max on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
import * as echarts from 'echarts/index.common';
declare var swal;
declare var AMap;
@Component({
    selector: 'chargeStationMap',
    templateUrl: '../views/chargeStationMap.html',
    styleUrls: ["../styles/chargeStationMap.scss"]
})
export class ChargeStationMapComponent implements OnInit {
    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.getMapDatas({
            page_now: 1,
            limit: 2000,
            search_by: {
                status: 1,
                net_status: 1
            }
        });
        this.getPieDatas();
    }

    getMapDatas(params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_device_list/hash/", {params: params});
        data.subscribe(res => {
            if (res.status) {
                let data = res.data.list;
                this.mapInit("map-left", data)
            } else {
                swal({
                    title: "获取设备信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer: "1500"
                });
            }
        })
    }

    public mapInit(id, markers) {   //markers 是data； 绑定的地址经纬度
        var map = new AMap.Map(id, {     //coordinate  地图ID   // 创建Map实例
            resizeEnable: true,
            zoom: 10,   //地图显示的缩放级别
            center: [121.297428, 31.1345], //经纬度，此处为上海   //地图中心点
        });
        var markers1 = [], m, gps, device_icon;
        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        markers.forEach((marker) => {
            gps = this.uc.BD09ToGCJ02(marker.device_lat, marker.device_lng);
            if (marker.device_type == 1) {
                device_icon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
            } else {
                device_icon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
            }
            m = new AMap.Marker({
                map: map,
                // position: [marker.device_lng, marker.device_lat],   //坐标  == 经纬度
                icon: device_icon,
                position: [gps.lon, gps.lat],   //坐标  == 经纬度
            });
            m.content = marker.device_type_name;
            if (marker.device_type == 1) {
                m.on('click', () => {
                    setTimeout(() => {
                        this.router.navigate(['pages/charge/chargeStatus', marker.device_id]);
                    }, 100)
                });
            }
            m.on('mouseover', function (e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            });
            m.on('mouseout', function () {
                infoWindow.close();
            });
            markers1.push(m);
        });
        // map.setFitView();  //根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别，参数overlayList默认为当前地图上添加的所有覆盖物图层
        map.plugin(["AMap.MarkerClusterer"], function () {
            new AMap.MarkerClusterer(map, markers1);
        });
    };

    // pie显示
    getPieDatas() {
        var dataTitle = [],
            dataContent = [],
            alarm_num = '告警中',
            free_num = '空闲中',
            charging_num = '充电中',
            offline_num = '离线中';

        let piedata = this.appHttpService.getData(this.uc.api.qc + '/get_statistics_device_info_for_home_page/hash/')
        piedata.subscribe(res => {
            if (res.status) {
                var data = res.data;
                if (!data)return;
                dataTitle = [alarm_num, free_num, offline_num, charging_num];
                dataContent = [
                    {name: alarm_num, value: data.alarm_num},
                    {name: free_num, value: data.free_num},
                    {name: offline_num, value: data.offline_num},
                    {name: charging_num, value: data.charging_num},
                ];
                var pieMap = echarts.init(document.getElementById('map-right'));   // pieMapCharge 饼图ID
                var option = {
                    title: {
                        text: '充电桩信息一览',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        width: '200px',
                        orient: 'horizontal',
                        bottom: '10',
                        x: 'center',
                        data: dataTitle
                    },
                    series: [
                        {
                            name: '充电站所属桩信息',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '40%'],
                            data: dataContent,
                            color: ['#f55753', '#4bdfd2', '#ccc', '#15b1ef'],
                            itemStyle: {
                                normal: {},
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                }
                            }

                        }
                    ]
                };
                // 为echarts对象加载数据
                pieMap.setOption(option);
            }
        })
    }
}