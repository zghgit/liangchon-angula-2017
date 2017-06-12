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

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_settlement_list/hash", {params: params})
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
                            class: "btn-success",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定结算?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/update_settlement_fine/hash/", {
                                                params: {
                                                    commodity_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal("结算成功!", "", "success");
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
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定结算?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/update_settlement_fine/hash/", {
                                                params: {
                                                    commodity_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal("结算成功!", "", "success");
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


}