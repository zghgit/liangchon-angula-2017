/**
 * Created by max on 2017/5/5.
 */

import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'complained-list',
    templateUrl: '../views/complainedList.html',
    styleUrls: ["../styles/complainedList.scss"]
})
export class complainedListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public searchBy: any = {};


    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.button = {
            class: 'btn-primary',
            content: '新增申诉',
            click: () => {
                this.router.navigateByUrl('pages/complained/complainedAdd');
            }
        };

        this.plugins.grid = {
            th: [
                {content: '用户ID', hidden: true},
                {content: '用户'},
                {content: '订单编号'},
                {content: '申诉内容'},
                {content: '状态'},
                {content: '时间'},
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
                title: '订单编号',
                key: "entity_id",
                controlType: "input",
                value: "",
                placeholder: "请输入订单编号"
            }, {
                title: '订单状态',
                key: "status",
                controlType: "select",
                value: "0",
                placeholder: "请选择订单状态",
                options: [{
                    name: '待处理',
                    geo_id: "1"
                }, {
                    name: '已处理',
                    geo_id: "2"
                }]
            }, {
                title: '用户名称',
                key: "complained_user_name",
                controlType: "input",
                value: "",
                placeholder: "请输入用户名称"
            }
        ]
        this.plugins.buttons = [
            {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        entity_id,
                        status,
                        complained_user_name,
                    } = value;
                    this.searchBy = {
                        entity_id: entity_id ? entity_id.trim() : "",
                        status: status,
                        complained_user_name: complained_user_name ? complained_user_name.trim() : "",

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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_complained_list", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.complained_id, hidden: true},
                        {content: key.complained_user_name},
                        {content: key.entity_id},
                        {content: key.complained_content},
                        {content: key.status == 1 ? '待处理' : '已处理'},
                        {content: key.create_time},
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_complained)) {
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: () => {
                                this.router.navigate(['pages/complained/complainedDetail', key.complained_id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.update_complained) && key.status == '1') {
                        operations.push({
                            content: "标记为已处理",
                            class: "btn-warning",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定处理?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/update_complained/", {
                                                params: {
                                                    complained_id: id,
                                                    complained_info: {
                                                        status: 2
                                                    }
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal({
                                                    title: "处理成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer:"2000"
                                                });
                                                this.getGridData(params);
                                            } else {
                                                swal("处理失败!", res.error_msg, "error");
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
            } else {
                swal({
                    title: "获取申诉信息失败!",
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


}