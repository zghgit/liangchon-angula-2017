/**
 * Created by max on 2017/4/19.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;

@Component({
    selector: 'childaccount-list',
    templateUrl: '../views/childAccountList.html'
})
export class ChildAccountListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public admin_flg:number|string;

    constructor(public router: Router,
                public dataService:DataService,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        let user_id   = this.dataService.getCookies('user_id');
        let parent_id = this.dataService.getCookies('parent_id');
        let user_type = this.dataService.getCookies("user_type");//1是主账户  2是子账户
         this.admin_flg = this.dataService.getCookies("admin_flg");//1是微云冲  2是另外三个
        let search_id;
        if (user_type == 2) {
            search_id = parent_id;
        } else {
            search_id = user_id;
        }

        if (this.uc.powerfun(this.uc.constant.add_sub_user)) {
            this.plugins.button = {
                class: 'btn-primary',
                content: '新增子账户',
                click: () => {
                    if (this.admin_flg == 1) {
                        this.router.navigateByUrl('pages/account/childAccountAdd');
                    } else if (this.admin_flg == 2) {//子账户可以添加子账户，平级，属于同一个上级
                        this.router.navigateByUrl('pages/account/childAccountOtherAdd');
                    }
                }
            };
        }
        this.plugins.grid = {
            th: [
                {content: '账户ID', hidden: true},
                {content: '账户名称'},
                {content: '上级'},
                {content: '账户类型'},
                {content: '启用状态'},
                {content: '手机号码'},
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
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {
                parent_id: search_id
            },

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_sub_user_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.user_id, hidden: true},
                        {content: key.user_name},
                        {content: key.parent_name},
                        {content: key.user_type_name+'-'+key.role},
                        {content: key.status == 1 ? '启用' : '禁用'},
                        {content: key.mobile_no},
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_sub_user) && key.operation.indexOf(this.uc.powercontroll.read) >= 0) {
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/account/childAccountDetail', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.update_sub_user) && key.operation.indexOf(this.uc.powercontroll.update) >= 0) {
                        operations.push({
                            content: "编辑",
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[0].content;
                                if (this.admin_flg == 1) {
                                    this.router.navigate(['pages/account/childAccountEdit', id]);
                                } else if (this.admin_flg == 2) {//子账户可以添加子账户，平级，属于同一个上级
                                    this.router.navigate(['pages/account/childAccountOtherEdit', id]);
                                }
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.disable_user) && key.status == '1' && key.operation.indexOf(this.uc.powercontroll.update) >= 0) {
                        operations.push({
                            content: "禁用",
                            class: "btn-danger",
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
                                        this.appHttpService.postData(this.uc.api.qc + "/disable_user/hash/" + id
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal("禁用成功!", "", "success");
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
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/start_user/hash/"+id
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal("启用成功!", "", "success");
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