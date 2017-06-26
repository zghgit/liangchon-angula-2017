/**
 * Created by max on 2017/6/5.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
declare var swal;
@Component({
    selector: 'app-management-list',
    templateUrl: '../views/appUserList.html'
})
export class AppManagementListComponent implements OnInit {
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
                {content: '用户ID', hidden: true},
                {content: '用户账户'},
                {content: '用户昵称'},
                {content: '充点'},
                {content: '启用状态'},
                {content: '操作'},
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
                title: '手机号码',
                key: "app_user_name",
                controlType: "input",
                value: "",
                placeholder: "请输入手机号码"
            }, {
                title: '用户状态',
                key: "status",
                controlType: "select",
                value: "0",
                placeholder: "请选择用户状态",
                options: [{
                    name: '启用',
                    geo_id: "1"
                }, {
                    name: '禁用',
                    geo_id: "2"
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
                        status,
                    } = value;
                    this.searchBy = {
                        app_user_name: app_user_name ? app_user_name.trim() : "",
                        status: status,
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
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_app_user_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.app_user_id, hidden: true},
                        {content: key.app_user_name},
                        {content: key.nickname},
                        {content: key.yun_coin},
                        {content: key.status == 1 ? '启用' : '禁用'},
                    ];
                    let operations = [];

                    if (this.uc.powerfun(this.uc.constant.get_app_user)) {
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/appManagement/appUserDetail', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.get_app_user)) {
                        operations.push({
                            content: "消息推送",
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[1].content;
                                this.router.navigate(['pages/appManagement/appMessagePush', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.get_app_user)) {
                        operations.push({
                            content: "收支明细",
                            class: "btn-purple",
                            click: (data) => {
                                let id = data[1].content;
                                this.router.navigate(['pages/appManagement/appChargeRecord', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.update_app_user) && key.status == '1') {
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
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/update_app_user/hash/", {
                                                params: {
                                                    app_user_id: id,
                                                    app_user_info: {
                                                        status: 2
                                                    }
                                                }
                                            }
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
                    };
                    if (this.uc.powerfun(this.uc.constant.update_app_user) && key.status == '2') {
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
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/update_app_user/hash/", {
                                                params: {
                                                    app_user_id: id,
                                                    app_user_info: {
                                                        status: 1
                                                    }
                                                }
                                            }
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
                    };
                    tds.push({type: "operation", operation: operations})
                    this.plugins.grid.tbody.push(tds)
                }
            }else {
                swal({
                    title: "获取APP用户信息失败!",
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

}