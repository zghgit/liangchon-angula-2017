/**
 * Created by max on 2017/6/12.
 */
/**
 * Created by max on 2017/5/5.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'settlement',
    templateUrl: '../views/settlement.html'
})
export class SettlementComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public searchBy: any = {};
    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        let startYear = 2017;
        let endYear = new Date().getFullYear();
        let yearOption = [];
        for (let year = startYear; year <= endYear; year++) {
            yearOption.push({
                name: year + "年",
                geo_id: year
            })
        }
        let dayOption = [];
        for (let day = 1; day <= 12; day++) {
            dayOption.push({
                name: (day<10? ("0"+day):day) + "月",
                geo_id: day
            })
        }
        this.plugins.grid = {
            th: [
                {content: '订单ID', hidden: true},
                {content: '结算ID'},
                {content: '账户'},
                {content: '商户名'},
                {content: '联系电话'},
                {content: '结算周期'},
                {content: '结算状态'},
                {content: '电量'},
                {content: '单价'},
                {content: '电费'},
                {content: '操作'}
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
                title: '商户名称',
                key: "merchant_name",
                controlType: "input",
                value: "",
                placeholder: "请输入商户账号/昵称/真实姓名"
            }, {
                title: '结算状态',
                key: "settlement_type",
                controlType: "select",
                value: "0",
                placeholder: "请选择结算状态",
                options: [{
                    name: '已结算',
                    geo_id: "1"
                }, {
                    name: '未结算',
                    geo_id: "2"
                }]
            },{
                title: '年份选择',
                key: "settlement_year",
                controlType: "select",
                value: "0",
                placeholder: "请选择年份",
                options: yearOption
            }, {
                title: '月份选择',
                key: "settlement_month",
                controlType: "select",
                value: "0",
                placeholder: "请选择月份",
                options: dayOption
            },
        ];
        this.plugins.buttons = [
            {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        merchant_name,
                        settlement_type,
                        settlement_year,
                        settlement_month,
                    } = value;
                    if(settlement_month){
                        swal({
                            title: "提示!",
                            text: "请选择年份",
                            type: "error",
                            timer:"2000"
                        });
                    }
                    this.searchBy = {
                        merchant_name: merchant_name ? merchant_name.trim() : "",
                        settlement_type:settlement_type,
                        settlement_year:settlement_year,
                        settlement_month:settlement_month,
                    }
                    this.now = 1;
                    this.getGridData({
                        page_now: this.now,
                        limit: 20000,
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
                        limit: 20000,
                        sort_by: 'create_time',
                        sort_type: 'desc',
                        search_by: this.searchBy,

                    })
                }
            },
        ];
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_settlement_list", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.settlement_id, hidden: true},
                        {content: key.settlement_id},
                        {content: key.user_name},
                        {content: key.real_name},
                        {content: key.mobile_no},
                        {content: key.settlement_cycle},
                        {content: key.settlement_type_name},
                        {content: key.charge_power},
                        {content: key.electricity_price},
                        {content: key.total_electricity_price},
                    ];
                    let operations = [];
                    if (key.settlement_type == 2 &&this.uc.powerfun(this.uc.constant.update_settlement_fine)) {
                        operations.push({
                            content: "结算",
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定结算?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/update_settlement_fine/", {
                                                params: {
                                                    commodity_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal({
                                                    title: "结算成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer:"2000"
                                                });
                                                this.getGridData(params);
                                            }else {
                                                swal("结算失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    };
                    if (this.uc.powerfun(this.uc.constant.update_settlement_fine)) {
                        operations.push({
                            content: "下载结算详情",
                            class: "btn-info",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定结算?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.downloadTemplate({commodity_id: id});
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
                    title: "获取结算信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
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
        this.appHttpService.getBinary(this.uc.api.qc + '/download_order_info/',{params:params}).subscribe(res => {
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