/**
 * Created by max on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;

@Component({
    selector: 'order-list',
    templateUrl: '../views/orderList.html',
    styleUrls: ['../styles/orderList.scss']
})
export class OrderListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public timecount = Number(new Date().getTime());

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
                title: '订单编号',
                key: "order_no",
                controlType: "input",
                inputType: "text",
                value: "",
                placeholder: "请输入账户名称"
            }, {
                title: '订单状态',
                key: "order_status",
                controlType: "select",
                value: "0",
                placeholder: "请选择订单状态",
                options: [{
                    name: '进行中',
                    geo_id: "1"
                }, {
                    name: '已完成',
                    geo_id: "2"
                }, {
                    name: '已退费',
                    geo_id: "3"
                }, {
                    name: '续费中',
                    geo_id: "4"
                }, {
                    name: '充电中',
                    geo_id: "5"
                }]
            }, {
                title: '支付方式',
                key: "pay_type",
                controlType: "select",
                value: "0",
                placeholder: "请选择支付方式",
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
            },{
                title: "业务地址",
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
            },
        ]
        this.plugins.grid = {
            th: [
                {content: '订单ID', hidden: true},
                {content: '订单编号'},
                {content: '商家'},
                {content: '设备编号'},
                {content: '设备名称'},
                {content: '设备类型'},
                {content: '商品'},
                {content: '用户'},
                {content: '启动来源'},
                {content: '金额'},
                {content: '支付方式'},
                {content: '找零(充点)'},
                {content: '支付单号'},
                {content: '收款账号'},
                {content: '订单状态'},
                {content: '结算方式'},
                {content: '创建时间'},
                {content: '操作'}
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1,
                totalItems: 1
            }
        }
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_order_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.order_id, hidden: true},
                        {content: key.order_no},
                        {content: key.business_name},
                        {content: key.device_no},
                        {content: key.device_name},
                        {content: key.device_type_name},
                        {content: key.commodity_name},
                        {content: key.app_user_name},
                        {content: key.start_from_name},
                        {content: key.order_sum},
                        {content: key.pay_type_name},
                        {content: key.give_change},
                        {content: key.trade_no},
                        {content: key.payee_business_name},
                        {content: key.order_status_name},
                        {content: key.payee_type_name},
                        {content: key.create_time}
                    ];
                    let operations = [];
                    //1、充电中2、3、4、续费中
                    let endTimd = Number(new Date(key.create_time).getTime());
                    if (key.order_status == '5' && (this.timecount - endTimd) >= 24 * 60 * 60 * 1000) {
                        operations.push({
                            content: "启用",
                            class: "btn-success",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定完成?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/order_finish/hash/", {
                                                params: {
                                                    order_id: id
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal("完成成功!", "", "success");
                                                this.getGridData(params);
                                            } else {
                                                swal("完成失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.order_finish) && (key.order_status == '1' || key.order_status == '4')) {
                        operations.push({
                            content: "完成",
                            class: "btn-success",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定完成?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/order_finish/hash/", {
                                                params: {
                                                    order_id: id
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal("完成成功!", "", "success");
                                                this.getGridData(params);
                                            } else {
                                                swal("完成失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.order_refund) && (key.order_status == '1' || key.order_status == '4')) {
                        operations.push({
                            content: "退费",
                            class: "btn-warning",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定退费?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/order_refund/hash/", {
                                                params: {
                                                    order_id: id
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal("退费成功!", "", "success");
                                                this.getGridData(params);
                                            } else {
                                                swal("退费失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    tds.push({type: "operation", operation: operations})
                    this.plugins.grid.tbody.push(tds)
                }
            }
        })
    };

    public pageBeChanged(event) {
        this.getGridData({
            page_now: event.page,
            limit: event.itemsPerPage,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},
        })
    }

    searchData({value}={value}) {
        console.log(value)
    }
}