/**
 * Created by max on 2017/6/14.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router,ActivatedRoute} from "@angular/router";
declare var swal;
@Component({
    selector: 'app-charge-record',
    templateUrl: '../views/appChargeRecord.html'
})
export class AppChargeRecordComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public searchBy: any = {};
    public app_user_name:string = "";

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public activatedRoute:ActivatedRoute,
                public uc: UC) {
    }

    ngOnInit() {
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            this.app_user_name = res.id;
        })

        this.plugins.grid = {
            th: [
                {content: '用户ID', hidden: true},
                {content: '用户名'},
                {content: '金额(元)'},
                {content: '支付类型'},
                {content: '收支类型'},
                {content: '时间'}
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1,
                totalItems: 1
            }
        };
        this.plugins.search = [
            {
                title: '用户账号',
                key: "app_user_name",
                controlType: "input",
                value: this.app_user_name||"",
                placeholder: "请输入用户账号"
            }, {
                title: '支付类型',
                key: "pay_type",
                controlType: "select",
                value: "0",
                placeholder: "请选择支付类型",
                options: [{
                    name: '支付宝',
                    geo_id: "1"
                }, {
                    name: '微信',
                    geo_id: "2"
                }, {
                    name: '充点',
                    geo_id: "3"
                }]
            }, {
                title: '收支类型',
                key: "specific_type",
                controlType: "select",
                value: "0",
                placeholder: "请选择收支类型",
                options: [{
                    name: '消费',
                    geo_id: "1"
                }, {
                    name: '退费',
                    geo_id: "2"
                }, {
                    name: '充值',
                    geo_id: "3"
                }, {
                    name: '赠点',
                    geo_id: "4"
                }]
            }
        ]
        this.plugins.buttons = [
            {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        app_user_name,
                        pay_type,
                        specific_type,
                    } = value;
                    this.searchBy = {
                        app_user_name: app_user_name ? app_user_name.trim() : "",
                        pay_type: pay_type,
                        specific_type: specific_type,
                    }
                    this.now = 1;
                    this.getGridData({
                        page_now: this.now,
                        limit: 20,
                        sort_by: 'create_time',
                        sort_type: 'desc',
                        search_by: this.searchBy,

                    })
                }
            },  {
                type: "reset",
                class: "btn-danger",
                content: "重置",
                click: () => {
                    if(this.app_user_name){
                        setTimeout(()=>{
                            this.plugins.search[0].value=this.app_user_name;
                        },0)
                        this.now = 1;
                        this.searchBy={
                            app_user_name:this.app_user_name
                        };
                    }else {
                        this.searchBy={};
                    }
                    this.getGridData({
                        page_now: this.now,
                        limit: 20,
                        sort_by: 'create_time',
                        sort_type: 'desc',
                        search_by: this.searchBy,

                    })
                }
            },
        ]
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {
                app_user_name:this.app_user_name,
            },

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_app_user_deposit_detail", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.user_id, hidden: true},
                        {content: key.app_user_name},
                        {content: key.pay_sum},
                        {content: key.pay_type_name},
                        {content: key.spending_type_name},
                        {content: key.create_time}
                    ];
                    this.plugins.grid.tbody.push(tds)
                }
            }else {
                swal({
                    title: "获取信息失败!",
                    text: res.error_msg,
                    type: "error",
                });
            }
        })
    };

    public pageBeChanged(event) {
        this.getGridData({
            page_now: event.page,
            limit: event.itemsPerPage,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: this.searchBy,
        })
    }

}