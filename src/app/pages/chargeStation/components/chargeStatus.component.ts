/**
 * Created by max on 2017/6/19.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router,ActivatedRoute} from "@angular/router";

declare var swal;
@Component({
    selector: 'chargeStatus',
    templateUrl: '../views/chargeStatus.html',
    styleUrls:["../styles/chargeStatus.scss"]
})
export class ChargeStatusComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public device_id:string;
    public evseStatistics:any={
        title:"",
        chargeCount:0,
        chargeTime:0,
        chargeDegree:0,
        contIsSmall:false,
        timeIsSmall:false,
        degreeIsSmall:false
    };
    public evses:Array<any>=[];
    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public activatedRoute:ActivatedRoute,
                public uc: UC) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params=>{
            let id = params.id;
            this.device_id = id;
            this.getStatus(id);
            this.getGridData({
                page_now: this.now,
                limit: 10,
                sort_by: 'create_time',
                sort_type: 'desc',
                search_by: {
                    device_id: id,
                },

            })

        })
        this.plugins.grid = {
            caption:"充电记录",
            th: [
                {content: '订单编号', hidden: true},
                {content: '用户名称'},
                {content: '商品名称'},
                {content: '枪口号'},
                {content: '启动来源'},
                {content: '订单状态'},
                {content: '金额'},
                {content: '支付方式'},
                {content: '结算方式'},
                {content: '启动时间'}
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 10,
                currentPage: 1
            }
        }
    }
    getStatus(params){
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_device_statistics/hash", {params: {device_id: params}});
        data.subscribe(res=>{
            if (res.status){
                let data=res.data;
                let gan=data.gun_info;
                let total_order_duration=Math.ceil(data.total_order_duration/60);
                this.evseStatistics={
                    title:data.device_name,
                    chargeCount:data.total_num,
                    chargeTime:total_order_duration,
                    chargeDegree:'0',
                    contIsSmall:false,
                    timeIsSmall:false,
                    degreeIsSmall:false
                };
                if(data.total_num>1000){
                    this.evseStatistics.contIsSmall=true
                }
                if(total_order_duration>1000){
                    this.evseStatistics.timeIsSmall=true
                }
                if(data.total_num>1000){
                    this.evseStatistics.contIsSmall=true
                }
                for(var key=0;key<gan.length;key++){
                    //1、空闲 2、充电中 3、故障中 4、启动中 5、结束中
                    if(gan[key].work_status==1){
                        this.evses.push({
                            no:gan[key].gun_num,
                            type:'charge-free',
                            backgroundClass:'charge-free',
                            evseStatus:'空闲中',
                            pic:[
                                {
                                    picClass:'charge-free-step1',
                                    picSrc:'/assets/images/charge/1.png',
                                    picAlt:''
                                },{
                                    picClass:'charge-free-step2',
                                    picSrc:'/assets/images/charge/2.png',
                                    picAlt:''
                                },{
                                    picClass:'charge-free-step3',
                                    picSrc:'/assets/images/charge/3.png',
                                    picAlt:''
                                }
                            ]
                        });
                    }
                    if(gan[key].work_status==2){
                        this.evses.push({
                            no:gan[key].gun_num,
                            type:'charge-ing',
                            backgroundClass:'charge-ing',
                            timeLeft:gan[key].remaining_time,
                            content:'剩余时间(min)',
                            evseStatus:'正在充电',
                            pic:[
                                {
                                    picClass:'charge-ing',
                                    picSrc:'/assets/images/charge/chargeing.png',
                                    picAlt:''
                                }
                            ]
                        });
                    }
                    if(gan[key].work_status==3){
                        this.evses.push({
                            no:gan[key].gun_num,
                            type:'charge-error',
                            backgroundClass:'charge-error',
                            evseStatus:'维护中',
                            pic:[
                                {
                                    picClass:'charge-light',
                                    picSrc:'/assets/images/charge/error-light.png',
                                    picAlt:''
                                },{
                                    picClass:'charge-dark',
                                    picSrc:'/assets/images/charge/error-dark.png',
                                    picAlt:''
                                }
                            ]
                        })
                    }
                    if(gan[key].work_status==4){
                        this.evses.push({
                            no:gan[key].gun_num,
                            type:'charge-ing',
                            backgroundClass:'charge-ing',
                            content:'充电桩启用中...',
                            contentClass:'chargeOperation',
                            evseStatus:'正在启用',
                        });
                    }
                    if(gan[key].work_status==5){
                        this.evses.push({
                            no:gan[key].gun_num,
                            type:'charge-ing',
                            backgroundClass:'charge-ing',
                            content:'充电桩停止中...',
                            contentClass:'chargeOperation',
                            evseStatus:'正在停止',
                        });
                    }
                }
            }else {
                swal({
                    title: "获取充电信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"1500"
                });
            }
        })
    };
    getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_order_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.tbody = [];
                this.plugins.grid.pagination.totalItems = data.total_num;
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.order_no, hidden: true},
                        {content: key.app_user_name},
                        {content: key.commodity_description},
                        {content: key.gun_num},
                        {content: key.start_from_name},
                        {content: key.order_status_name},
                        {content: key.order_sum},
                        {content: key.pay_type_name},
                        {content: key.payee_type_name},
                        {content: key.create_time},
                    ];
                    this.plugins.grid.tbody.push(tds)
                }
            }
        })
    }

    public pageBeChanged(event) {
        this.getGridData({
            page_now: event.page,
            limit: event.itemsPerPage,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {
                device_id: this.device_id,
            },
        })
    }
}