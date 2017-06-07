/**
 * Created by max on 2017/6/5.
 */


import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'rechargecardrecord-list',
    templateUrl: '../views/rechargeCardRecord.html'
})
export class rechargeCardRecordListComponent implements OnInit {
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
                {content: '充值单号'},
                {content: '充值卡号'},
                {content: '商家'},
                {content: '设备号'},
                {content: '设备名称'},
                {content: '用户'},
                {content: '金额'},
                {content: '支付方式'},
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_charge_card_record_list/hash", {params: params})
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
                        {content: key.card_no},
                        {content: key.business_name},
                        {content: key.device_no},
                        {content: key.device_name},
                        {content: key.app_user_name},
                        {content: key.order_sum},
                        {content: key.pay_type_name},
                        {content: key.trade_no},
                        {content: key.payee_business_name},
                        {content: key.order_status_name},
                        {content: key.payee_type_name},
                        {content: key.create_time}
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.order_finish) && (key.order_status == '6' || key.order_status == '4')) {
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
                                        this.appHttpService.postData(this.uc.api.qc + "/card_order_finish/hash/", {
                                                params: {
                                                    order_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal("完成成功!", "", "success");
                                                this.getGridData(params);
                                            }else {
                                                swal("完成失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.order_refund) && (key.order_status == '6' || key.order_status == '4')) {
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
                                        this.appHttpService.postData(this.uc.api.qc + "/card_order_refund/hash/", {
                                                params: {
                                                    order_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal("退费成功!", "", "success");
                                                this.getGridData(params);
                                            }else {
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


}