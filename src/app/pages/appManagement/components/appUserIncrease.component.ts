/**
 * Created by max on 2017/6/5.
 */
import {Component, OnInit,HostListener} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import * as echarts from 'echarts/index.common';
declare var moment;
@Component({
    selector: 'app-user-increase',
    templateUrl: '../views/appUserIncrease.html',
    styleUrls:["../styles/appUserIncrease.scss"]
})
export class AppUserIncreaseComponent implements OnInit {
    constructor(public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        let time = new Date();
        let days = 6;
        let duration = time.getDate() - days;
        let newtime= new Date().setDate(duration)
        let endTime = moment(time).format('YYYY-MM-DD 23:59:59');
        let startTime = moment(newtime).format('YYYY-MM-DD 00:00:00');
        var params={
            params:{
                start_time : startTime,
                end_time : endTime
            }
        }
        this.getAppUserData(params);
    }

    public  getAppUserData(params) {
        let data = this.appHttpService.postData(this.uc.api.qc + '/get_app_user_growth_statistics/hash/',params);
        data.subscribe(res => {
            if (res.status){
                let _data = res.data;
                let yAxis = [];
                let xAxis = [];
                for (var i in _data){
                    xAxis.push(i);
                    yAxis.push(_data[i])
                }
                let myChart = echarts.init(document.getElementById('appUserIncrease'));

                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '最近7天APP用户统计',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: "{b}<br>{a0}:{c0} 人<br>"
                    },
                    legend: {
                        data:['用户总数'],
                        top:'30px',
                        left: 'center'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel:{
                            show:true,
                            interval:0,
                            margin:8,
                        },
                        data: xAxis
                    },
                    yAxis: {
                        name:'用户总数(人)',
                        nameLocation: 'end',
                        boundaryGap: false,
                        // interval:1,
                        splitLine:{
                            show:true,
                            interval:'auto',
                            lineStyle:{
                                type:'dashed',
                                color:'#e5e5e5'
                            },
                        },
                        axisTick:{
                            inside:true,
                        }
                    },
                    series: [{
                        name: '用户总数',
                        type: 'line',
                        smooth:'quadraticInOut',
                        itemStyle:{
                            normal:{
                                color:'#e96b3a',
                                lineStyle:{
                                    color:'#e96b3a',
                                    width:1
                                },
                                label:{
                                    show:false
                                }
                            }
                        },
                        sampling: 'average',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#f9e5de'
                                }, {
                                    offset: 1,
                                    color: 'white'
                                }])
                            }
                        },
                        data: yAxis
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        })
    }
}