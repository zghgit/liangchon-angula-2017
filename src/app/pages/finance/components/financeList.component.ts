/**
 * Created by max on 2017/5/5.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
declare var swal;
@Component({
    selector: 'finance-list',
    templateUrl: '../views/financeList.html',
    styleUrls:["../styles/financeList.scss"]
})
export class FinanceListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public rejectInfo:any={};
    public showRejectInfo:boolean=false;
    public reject_reason:string="";

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        if(this.uc.powerfun(this.uc.constant.withdraw_cash)){
            this.plugins.button = {
                class:'btn-primary',
                content:'申请提现',
                click:()=>{
                    this.router.navigateByUrl('pages/finance/cashWithdrawal');
                }
            };
        }
        this.plugins.grid = {
            th: [
                {content: '订单ID', hidden: true},
                {content: 'ID'},
                {content: '提现金额(元)'},
                {content: '到账方式'},
                {content: '收款人'},
                {content: '申请时间'},
                {content: '提现状态'},
                {content: '审核人'},
                {content: '拒绝理由'},
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_withdraw_cash_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                localStorage.setItem("validTime",JSON.stringify(data.time));
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                let index = 1;
                for (let key of list) {
                    let tds: Array<any>;
                    var cash_status;
                    switch (key.cash_status){
                        case '1':cash_status='审核中...';break;
                        case '2':cash_status='驳回';break;
                        case '3':cash_status='已通过';break;
                        case '4':cash_status='已打款';break;
                        default:'未知';break
                    }
                    tds = [
                        {content: key.cash_id, hidden: true},
                        {content: index++},
                        {content: key.cash_sum},
                        {content: key.pay_type_name},
                        {content: key.applicant_name},
                        {content: key.apply_time},
                        {content: cash_status},
                        {content: key.updater_name},
                        {content: key.reject_reason},
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.accept_withdraw_cash)&&key.cash_status==1) {
                        operations.push({
                            content: "通过",
                            class: "btn-success",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定通过?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/accept_withdraw_cash/hash/", {
                                                params: {
                                                    cash_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal({
                                                    title: "通过成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer:"1500"
                                                });
                                                this.getGridData(params);
                                            }else {
                                                swal("通过失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.reject_withdraw_cash)&&key.cash_status==1) {
                        operations.push({
                            content: "驳回",
                            class: "btn-warning",
                            click: (data) => {
                                let id = data[0].content;
                                this.showRejectInfo = true;
                                this.rejectInfo['cash_id']=data[0].content;
                                this.rejectInfo['applicant_name']=data[4].content;
                                this.rejectInfo['apply_time']=data[5].content;
                                this.rejectInfo['valid']="拒绝理由一定要填写";
                                this.rejectInfo['reject_reason']="";
                            }
                        })
                    };
                    if (this.uc.powerfun(this.uc.constant.paid_withdraw_cash)&&key.cash_status==3&&key.cash_status!=4) {
                        operations.push({
                            content: "打款",
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定打款?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/paid_withdraw_cash/hash/", {
                                                params: {
                                                    cash_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal({
                                                    title: "打款成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer:"1500"
                                                });
                                                this.getGridData(params);
                                            }else {
                                                swal("打款失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    };
                    tds.push({type: "operation", operation: operations})
                    this.plugins.grid.tbody.push(tds)
                }
            }else {
                swal({
                    title: "获取账务信息失败!",
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
            search_by: {},
        })
    }
    public closeRejectInfo(){
        this.showRejectInfo=false
    }
    public confirmReject(data){
        this.closeRejectInfo();
        swal({
            title: '确定驳回?',
            text: '',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '确定!',
            cancelButtonText: '取消',
            showLoaderOnConfirm: true,
            confirmButtonColor: "#DD6B55",
        }).then((isConfirm) => {
            if (isConfirm === true) {
                this.appHttpService.postData(this.uc.api.qc + "/reject_withdraw_cash/hash/", {
                        params: {
                            cash_id: data.cash_id,
                            reject_reason:data.reject_reason
                        }
                    }
                ).subscribe(res=>{
                    if (res.status){
                        swal({
                            title: "驳回成功!",
                            text: "",
                            type: "success",
                            timer:"1500"
                        });
                        this.getGridData({
                            page_now: this.now,
                            limit: 20,
                            sort_by: 'create_time',
                            sort_type: 'desc',
                            search_by: {},

                        })
                    }else {
                        swal("驳回失败!", res.error_msg, "error");
                    }
                })
            }
        }, () => {
        });
    }

}