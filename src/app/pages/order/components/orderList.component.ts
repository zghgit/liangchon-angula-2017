/**
 * Created by max on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;

import * as moment from 'moment';

@Component({
    selector: 'order-list',
    templateUrl: '../views/orderList.html',
    styleUrls: ['../styles/orderList.scss']
})
export class OrderListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public timecount = Number(new Date().getTime());
    public moreCondition: boolean = false;
    public searchBy: any = {};

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
            }, {
                title: '订单编号',
                key: "order_no",
                controlType: "input",
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
            },
            // {
            //     title: 'nothing',
            //     key: "nothing",
            //     controlType: "nothing",
            //     inputType: "text",
            //     value: "nothing",
            //     hidden: true,
            //     placeholder: "nothing"
            // },
            {
                title: '机构名称',
                key: "business_name",
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
                title: '设备小区名称',
                key: "areas_name",
                controlType: "input",
                value: "",
                hidden: true,
                placeholder: "请输入设备小区名称"
            } ,{
                title: "机构地址",
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
                key: "device_address",
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
        ]
        this.plugins.buttons = [
            {
                type: "notform",
                class: "btn-success",
                content: "展开条件",
                click: () => {
                    this.moreCondition = !this.moreCondition;
                    if (this.moreCondition) {
                        this.plugins.buttons[0].content = "收起条件";
                        for (let i = 5; i < this.plugins.search.length; i++) {
                            this.plugins.search[i].hidden = false;
                        }
                    } else {
                        this.plugins.buttons[0].content = "展开条件";
                        for (let i = 5; i < this.plugins.search.length; i++) {
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
                        order_no,
                        order_status,
                        start_time,
                        end_time,
                        device_name,
                        business_name,
                        pay_type,
                        areas_name,
                        business_type,
                        device_address,
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
                        order_no: order_no ? order_no.trim() : "",
                        order_status: order_status,
                        start_time: start_time ? moment(start_time).format('YYYY-MM-DD 00:00:00') : '',
                        end_time: end_time ? moment(end_time).format('YYYY-MM-DD 23:59:59') : '',
                        device_name: device_name ? device_name.trim() : "",
                        business_name: business_name ? business_name.trim() : "",
                        pay_type: pay_type,
                        device: {
                            areas_name: areas_name ? areas_name.trim() : "",
                            province_code: device_address.province_code,
                            city_code: device_address.city_code,
                            district_code: device_address.district_code
                        },
                        user: {
                            busiess_type: business_type,
                            province_code: business_address.province_code,
                            city_code: business_address.city_code,
                            district_code: business_address.district_code
                        }
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
                type: "form",
                class: "btn-info",
                content: "导出",
                click: ({value}={value}) => {
                    this.downloadTemplate(this.searchBy);
                }
            }, {
                type: "reset",
                class: "btn-danger",
                content: "重置",
                click: () => {
                    this.searchBy={};
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
                                                swal({
                                                    title: "完成成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer: "1500"
                                                });
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
                                                swal({
                                                    title: "完成成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer: "1500"
                                                });
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
                                                swal({
                                                    title: "退费成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer: "1500"
                                                });
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
            }else {
                swal({
                    title: "获取订单信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"1500"
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
    //下载
    downloadTemplate(params) {
        this.appHttpService.getBinary(this.uc.api.qc + '/download_order_info/hash/',{params:params}).subscribe(res => {
            let disposition = res.headers._headers.get("content-disposition");

            if (!disposition) {
                swal("下载失败", res.error_msg, "error")
            } else {
                let blob = new Blob([res._body], {type: "application/vnd.ms-excel"});
                let objectUrl = URL.createObjectURL(blob);
                let a = document.createElement('a');
                let filename = disposition[0].split(";")[1].trim().split("=")[1]
                try {
                    filename = JSON.parse(filename)
                } catch (e) {
                    console.log(e);
                }
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                a.setAttribute('download', filename);
                a.click();
                URL.revokeObjectURL(objectUrl);
            }

        })
    }
}