/**
 * Created by max on 2017/5/5.
 */
import { Component, OnInit,OnDestroy,HostListener} from '@angular/core';
import { AppHttpService,UC} from "../../plugins/globalservice";
import * as echarts from 'echarts/index.common';

@Component({
    selector: 'home',
    templateUrl: 'home.html',
    styleUrls:['home.scss']
})
export class HomeComponent implements OnInit {
    public model:any={};
    public chargingInfo:any = {};
    public time1;
    public time2;
    public offon:boolean = true;
    @HostListener('window:resize')
    onResize() {
        if(this.offon){
            this.getPieChart();
            this.getChargingInfo();
            this.getchargingData();
            this.offon = false;
            setTimeout(()=>{
                this.offon = true;
            },1800)
        };
    }
    constructor(
        public uc:UC,
        public appHttpService:AppHttpService
    ) {

    }

    ngOnInit() {
        this.getPieChart();
        this.getChargingInfo();
        this.getchargingData();
        this.time1 = setInterval(()=>{
            this.getPieChart();
            this.getChargingInfo();
        },10*60*1000);
        this.time2 = setInterval(() => {
            this.getchargingData();
        },60*60*1000)
    }
    ngOnDestroy(){
        clearInterval(this.time1);
        clearInterval(this.time2);
    }
    public getPieChart(){
        let dataTitle=[],
            dataContent=[];
        let alarm_num	    = '故障枪口',
            free_num		= '空闲枪口',
            offline_num	= '离线枪口',
            charging_num	= '充电中枪口';
        let data =  this.appHttpService.getData(this.uc.api.qc+'/get_statistics_device_info_for_home_page/hash/');
        data.subscribe(res=>{
            if(res.status){
                let data = res.data;
                this.model['organizationName'] = data.user_name;
                this.model['userList'] = data.lower_user_info;
                this.model.userList.push({
                    role_name:"充电桩数量",
                    user_num:data.device_num
                });
                dataTitle=[alarm_num,free_num,offline_num,charging_num];
                dataContent =[
                    {name:alarm_num,value:data.alarm_num},
                    {name:free_num,value:data.free_num},
                    {name:offline_num,value:data.offline_num},
                    {name:charging_num,value:data.charging_num},
                ];
                let pieChart = {
                    title : {
                        x:'center',
                        text:'充电桩信息',
                        textStyle:{
                            fontSize:14,
                            fontWeight:'bolder'
                        },
                        top:20
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        width : '200px',
                        orient: 'horizontal',
                        x:'center',
                        bottom: '10',
                        data: dataTitle
                    },
                    series : [
                        {
                            name: '充电站所属桩信息',
                            type: 'pie',
                            radius : '60%',
                            center: ['50%', '40%'],
                            data:dataContent,
                            color:['#f55753','#4bdfd2','#ccc','#15b1ef'],
                            itemStyle: {
                                normal:{
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label:{
                                normal:{
                                    show:false,
                                }
                            }

                        }
                    ]
                };
                echarts.init(document.getElementById('pieCharts')).setOption(pieChart);
            }

        })
    }
    public getChargingInfo(){
        let data =  this.appHttpService.getData(this.uc.api.qc+'/get_realtime_device_info_for_home_page/hash/');
        data.subscribe(res=>{
            if (res.status){
                let data = res.data;
                this.chargingInfo['todayFinishChargingTimes']=data.today_finish_charging_times;
                this.chargingInfo['todayChargingTimes']=data.today_charging_times;
                this.chargingInfo['todayAlarmTimes']=data.today_alarm_times;
                this.chargingInfo['todayTotalSum']=data.today_total_sum;
            }
        })
    }
    public  getchargingData(){
        let data =  this.appHttpService.getData(this.uc.api.qc+'/get_today_device_times_for_home_page/hash/');
        data.subscribe(res=>{
            if(res.status){
                let data = res.data
                var finish_charging_times = [];//完成充电次数
                var charging_times        = [];//正在充电次数
                var stat_hour             = [];//完成时间
                var maxTimes = 0;
                for(var key = 0; key < data.length; key++){
                    var charging = parseInt(data[key].charging_times);
                    var finish = parseInt(data[key].finish_charging_times)
                    stat_hour.push(data[key].stat_hour||'0');
                    charging_times.push(charging);
                    finish_charging_times.push(finish);
                    if(charging > maxTimes){
                        maxTimes = charging;
                    }
                    if(finish > maxTimes){
                        maxTimes = finish
                    }
                }
                var max = (maxTimes> 5 ? maxTimes : 5);
                if(max>5){
                    max = Math.ceil(max*1.2);
                    max = (max%2 == 0 ? max : max + 1);
                }
                //曲线图
                if(document.getElementById('chargeLoad') != null){
                    var chartChargeLoad = echarts.init(document.getElementById('chargeLoad'));
                    var optionChargeLoad = {
                        title: {
                            text: '每小时充电次数曲线'
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: "{b} 点<br>{a0}:{c0}<br> {a1}:{c1}"
                        },
                        legend: {
                            x:'center',
                            y:16,
                            data:['正在充电次数','完成充电次数']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                            }
                        },
                        calculable: true,
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            axisLabel:{
                                show:true,
                                interval:'auto',
                                margin:8,
                                formatter:'{value}点'
                            },
                            data: stat_hour
                        },
                        yAxis: [

                            {
                                name: '充电次数(次)',
                                nameLocation: 'end',
                                boundaryGap: false,
                                type: 'value',
                                // minInterval: 1,
                                min:0,
                                max:max,
                                axisLabel:{formatter:'{value}'},
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

                            }

                        ],
                        series: [
                            {
                                name:'完成充电次数',
                                type:'line',
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
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                data:finish_charging_times
                            },
                            {
                                name:'正在充电次数',
                                type:'line',
                                smooth:'quadraticInOut',
                                itemStyle:{
                                    normal:{
                                        color:'#3384d5',
                                        lineStyle:{
                                            color:'#3384d5',
                                            width:1
                                        }
                                    }
                                },
                                sampling: 'average',
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#e1eefa'
                                        }, {
                                            offset: 1,
                                            color: 'white'
                                        }])
                                    }
                                },
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                data:charging_times
                            }
                        ]
                    };
                    // 为echarts对象加载数据
                    chartChargeLoad.setOption(optionChargeLoad);
                }
            }
        })
    }
}