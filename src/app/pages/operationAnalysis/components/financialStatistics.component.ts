/**
 * Created by max on 2017/6/5.
 */

import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
import * as moment from 'moment';

declare var swal;
@Component({
    selector: 'financial-statistics-list',
    templateUrl: '../views/financialStatistics.html'
})
export class FinancialStatisticsComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public searchBy: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.grid = {
            th: [
                {content: 'ID', hidden: true},
                {content: '时间'},
                {content: '机构名称'},
                {content: '所在地'},
                {content: '营业收入(元)'},
                {content: '已结算(元)'},
                {content: '未结算(元)'}
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1,
                totalItems: 1
            }
        };
        this.plugins.grid2 = {
            caption: "营业统计信息",
            th: [
                {content: '营业收入(元)'},
                {content: '已结算(元)'},
                {content: '未结算(元)'}
            ],
            tbody: []
        };
        this.plugins.search = [
            {
                title: "开始时间",
                key: "start_time",
                controlType: "time",
                value: "",
                config: {
                    showTimePicker: false,
                    format: 0,
                },
                placeholder: "请点击选择日期",
            }, {
                title: "结束时间",
                key: "end_time",
                controlType: "time",
                value: "",
                config: {
                    showTimePicker: false,
                    format: 0,
                },
                placeholder: "请点击选择日期",
            }, {
                title: '机构名称',
                key: "user_name",
                controlType: "input",
                value: "",
                placeholder: "请输入机构名称"
            }, {
                title: '机构类型',
                key: "order_status",
                controlType: "select",
                value: "0",
                placeholder: "请选择机构类型",
                options: [{
                    name: '代理商',
                    geo_id: "代理商"
                }, {
                    name: '城市合伙人',
                    geo_id: "城市合伙人"
                }, {
                    name: '商户',
                    geo_id: "商户"
                }]
            }, {
                title: "机构地址",
                key: "business_address",
                controlType: "address",
                hasChildGroup: true,
                url: this.uc.api.qc + '/get_geo_list/hash/',
                config: {
                    province: {
                        name: 'province_code',
                        value: "0",
                        placeholder: "--请选择省--",
                    },
                    city: {
                        name: 'city_code',
                        value: '0',
                        placeholder: "--请选择市--",
                    },
                    area: {
                        name: 'district_code',
                        value: '0',
                        placeholder: "--请选择区--",
                    }
                }
            }
        ]
        this.plugins.buttons = [
            {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        start_time,
                        end_time,
                        user_name,
                        busiess_type,
                        business_address,
                    } = value;
                    if (start_time && !end_time || !start_time && end_time) {
                        // swal("搜索失败","开始时间和结束时间要一起填写!","error");
                        swal({
                            title: "提示!",
                            text: "开始时间和结束时间要一起填写",
                            type: "error",
                            timer: "1500"
                        });
                        return
                    }
                    if (start_time > end_time) {
                        swal({
                            title: "提示!",
                            text: "开始时间不能大开结束时间",
                            type: "error",
                            timer: "1500"
                        });
                        return
                    }
                    this.searchBy = {
                        start_time: start_time ? moment(start_time).format('YYYY-MM-DD 00:00:00') : '',
                        end_time: end_time ? moment(end_time).format('YYYY-MM-DD 23:59:59') : '',
                        busiess_type: busiess_type,
                        user_name: user_name ? user_name.trim() : "",
                        province_code:business_address.province_code,
                        city_code:business_address.city_code,
                        district_code:business_address.district_code,
                    };
                    this.now = 1;
                    this.getGridData({
                        page_now: this.now,
                        limit: 20,
                        sort_by: 'create_time',
                        sort_type: 'desc',
                        search_by: this.searchBy,

                    })
                }
            }, {
                type: "reset",
                class: "btn-danger",
                content: "重置",
                click: () => {
                    this.searchBy = {};
                    this.now = 1;
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
            search_by: {},

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_statistics_charge_station_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                this.plugins.grid2.tbody = [];
                let count = data.count;
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.order_id, hidden: true},
                        {content: key.year + '-' + key.month + '-' + key.day},
                        {content: key.user_name},
                        {content: key.device_address},
                        {content: key.charge_order_sum},
                        {content: key.cash_status_done_sum},
                        {content: key.cash_status_sum}
                    ];
                    this.plugins.grid.tbody.push(tds)
                }
                if (count) {
                    let td2 = [
                        {content: count.charge_order_count || 0},
                        {content: count.cash_status_done_count || 0},
                        {content: count.cash_status_none_count || 0},
                    ]
                    this.plugins.grid2.tbody.push(td2)
                }
            } else {
                swal({
                    title: "获取账务统计信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer: "1500"
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