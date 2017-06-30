/**
 * Created by max on 2017/6/5.
 */

import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
import * as moment from 'moment';


declare var swal;
@Component({
    selector: 'organization-statistics-list',
    templateUrl: '../views/organizationStatistics.html'
})
export class OrganizationStatisticsComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public moreCondition: boolean = false;
    public searchBy: any = {
        user_name:""
    };

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
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
                title: '消费类型',
                key: "spendig_type",
                controlType: "select",
                value: "0",
                placeholder: "请选择消费类型",
                options: [{
                    name: '充电',
                    geo_id: "1"
                }, {
                    name: '充值',
                    geo_id: "2"
                }]
            }, {
                title: '机构名称',
                key: "user_name",
                controlType: "input",
                value: "",
                hidden: true,
                placeholder: "请输入机构名称"
            }, {
                title: '机构类型',
                key: "business_type",
                controlType: "select",
                value: "0",
                hidden: true,
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
                title: '设备名称',
                key: "device_name",
                controlType: "input",
                value: "",
                hidden: true,
                placeholder: "请输入设备名称"
            }, {
                title: '设备类型',
                key: "device_type",
                controlType: "select",
                value: "0",
                hidden: true,
                placeholder: "请选择设备类型",
                options: [{
                    name: '充电桩',
                    geo_id: "1"
                }, {
                    name: '充值机',
                    geo_id: "2"
                }]
            }, {
                title: '设备详细地址',
                key: "device_address",
                controlType: "input",
                value: "",
                hidden: true,
                placeholder: "请输入设备详细地址"
            }, {
                title: '设备小区名称',
                key: "areas_name",
                controlType: "input",
                value: "",
                hidden: true,
                placeholder: "请输入设备小区名称"
            }, {
                title: "商家地址",
                key: "business_address",
                controlType: "address",
                hasChildGroup: true,
                hidden: true,
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
            }, {
                title: "设备地址",
                key: "device_address_info",
                controlType: "address",
                hasChildGroup: true,
                hidden: true,
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
        ];
        this.plugins.buttons = [
            {
                type: "notform",
                class: "btn-success",
                content: "展开条件",
                click: () => {
                    this.moreCondition = !this.moreCondition;
                    if (this.moreCondition) {
                        this.plugins.buttons[0].content = "收起条件";
                        for (let i = 3; i < this.plugins.search.length; i++) {
                            this.plugins.search[i].hidden = false;
                        }
                    } else {
                        this.plugins.buttons[0].content = "展开条件";
                        for (let i = 3; i < this.plugins.search.length; i++) {
                            this.plugins.search[i].hidden = true;
                        }
                    }

                }
            }, {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        start_time,
                        end_time,
                        spendig_type,
                        user_name,
                        business_type,
                        device_name,
                        device_type,
                        device_address,
                        areas_name,
                        device_address_info,
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
                        spendig_type:spendig_type,
                        user_name:user_name,
                        busiess_type:business_type,
                        device_name: device_name ? device_name.trim() : "",
                        device_type:device_type,
                        device_address: device_address ? device_address.trim() : "",
                        areas_name: areas_name ? areas_name.trim() : "",
                        province_code: device_address_info.province_code,
                        city_code: device_address_info.city_code,
                        district_code: device_address_info.district_code,
                        user: {
                            province_code: business_address.province_code,
                            city_code: business_address.city_code,
                            district_code: business_address.district_code
                        }
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
        ];
        this.plugins.grid = {
            th: [
                {content: 'ID', hidden: true},
                {content: '时间'},
                {content: '机构名称'},
                {content: '机构类型'},
                {content: '设备名称'},
                {content: '设备类型'},
                {content: '支付宝(元)'},
                {content: '微信(元)'},
                {content: '充点'},
                {content: '移动营业额(元)'},
                {content: '消费类型'},
                {content: '刷卡额(元)'},
                {content: '投币额(元)'},
                {content: '地址'},
                {content: '总耗电量(度)'},
                {content: '单价(元)'},
                {content: '设备电费成本(元)'},
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
                {content: '支付宝(元)'},
                {content: '微信(元)'},
                {content: '充点'},
                {content: '移动营业额(元)'},
                {content: '刷卡额(元)'},
                {content: '投币额(元)'},
                {content: '总耗电量(度)'},
                {content: '设备电费成本(元)'},
            ],
            tbody: []
        };
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
                        {content: key.role_name},
                        {content: key.device_name},
                        {content: key.device_type_name},
                        {content: key.alipay_sum},
                        {content: key.wxpay_sum},
                        {content: key.yun_sum},
                        {content: key.charge_order_sum},
                        {content: key.spendig_type == 1 ? '充电' : '充值'},
                        {content: key.card_sum},
                        {content: key.coin_sum},
                        {content: key.device_address},
                        {content: key.charge_powear},
                        {content: key.electricity},
                        {content: key.electricity_cost}
                    ];
                    this.plugins.grid.tbody.push(tds)
                }
                if (count) {
                    let td2 = [
                        {content: count.ali_pay_count || 0},
                        {content: count.wx_pay_count || 0},
                        {content: count.yun_pay_count || 0},
                        {content: count.charge_order_count || 0},
                        {content: count.card_sum_count || 0},
                        {content: count.coin_sum_count || 0},
                        {content: count.charge_power_count || 0},
                        {content: count.electricity_cost_count || 0},
                    ]
                    this.plugins.grid2.tbody.push(td2)
                }
            } else {
                swal({
                    title: "获取机构统计信息失败!",
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