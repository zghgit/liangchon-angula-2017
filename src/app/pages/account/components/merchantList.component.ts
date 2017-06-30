/**
 * Created by max on 2017/4/19.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
declare var swal;
@Component({
    selector: 'merchant-list',
    templateUrl: '../views/merchantList.html',
    styleUrls:["../styles/merchantList.scss"]
})
export class MerchantListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        if (this.uc.powerfun(this.uc.constant.add_business_user)) {
            this.plugins.button = {
                class: 'btn-primary',
                content: '新增商户',
                click: () => {
                    this.router.navigateByUrl('pages/account/merchantAdd');
                }
            };
        }
        this.plugins.grid = {
            th: [
                {content: '用户ID', hidden: true},
                {content: '账户名称'},
                {content: '上级'},
                {content: '账户类型'},
                {content: '启用状态'},
                {content: '手机号码'},
                {content: '操作'},
            ],
            tbody: [],
            pagination : {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1,
                totalItems:1
            }
        }
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {
                bind_status: 2,
            },

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_business_user_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination['totalItems'] = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.user_id, hidden: true},
                        {content: key.user_name},
                        {content: key.parent_name},
                        {content: key.user_type_name},
                        {content: key.status == '1' ? "启用" : "禁用"},
                        {content: key.mobile_no},
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_business_user) && key.operation.indexOf(this.uc.powercontroll.read) >= 0) {
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/account/merchantDetail', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.update_business_user) && key.operation.indexOf(this.uc.powercontroll.update) >= 0) {
                        operations.push({
                            content: "编辑",
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/account/merchantEdit', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.disable_user) && key.status == '1' && key.operation.indexOf(this.uc.powercontroll.update) >= 0) {
                        operations.push({
                            content: "禁用",
                            class: "btn-black",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定禁用?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/disable_user/hash/" + id
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal({
                                                    title: "禁用成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer:"1500"
                                                });
                                                this.getGridData(params);
                                            } else {
                                                swal("禁用失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.start_user) && key.status == '2' && key.operation.indexOf(this.uc.powercontroll.update) >= 0) {
                        operations.push({
                            content: "启用",
                            class: "btn-success",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定启用?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/start_user/hash/"+id
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal({
                                                    title: "启用成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer:"1500"
                                                });
                                                this.getGridData(params);
                                            } else {
                                                swal("启用失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.get_sub_user_list)) {
                        operations.push({
                            content: "子账户",
                            class: "btn-purple",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/account/allChildAccountList', id]);
                            }
                        })
                    }
                    tds.push({type: "operation", operation: operations})
                    this.plugins.grid.tbody.push(tds)
                }
            }else {
                swal({
                    title: "获取商户信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"1500"
                });
            }
        },error=>{
            console.log(error)
        })
    };

    public pageBeChanged(event) {
        this.getGridData({
            page_now: event.page,
            limit: event.itemsPerPage,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {
                user_name: '',
                role: ''
            },
        })
    }

}