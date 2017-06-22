/**
 * Created by max on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'advertisement-list',
    templateUrl: '../views/advertisementList.html',
    styleUrls: ['../styles/advertisementList.scss']
})
export class AdvertisementListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};


    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        if (this.uc.powerfun(this.uc.constant.add_city_partner_user)) {
            this.plugins.button = {
                class: 'btn-primary',
                content: '新增广告',
                click: () => {
                    this.router.navigateByUrl('pages/advertisement/advertisementAdd');
                }
            };
        }
        this.plugins.grid = {
            th: [
                {content: '广告ID', hidden: true},
                {content: '广告名称'},
                {content: '图片(点击查看大图)'},
                {content: '链接地址'},
                {content: '显示时长(秒)'},
                {content: '点击次数'},
                {content: '显示位置'},
                {content: '启用状态'},
                {content: '默认广告'},
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_advertisement_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                let basesrc=this.uc.api.qc+"/get_file/hash/";
                for (let key of list) {
                    let tds: Array<any>;
                    var show_position;
                    switch (key.show_position) {
                        case '1':
                            show_position = '启动画面';
                            break;
                        case '2':
                            show_position = '结算页面';
                            break;
                        case '3':
                            show_position = '首页banner';
                            break;
                        case '4':
                            show_position = '引导页面';
                            break;
                        default:
                            show_position = '未指定';
                            break;
                    }
                    tds = [
                        {content: key.advertisement_id, hidden: true},
                        {content: key.advertisement_name},  // 广告名称
                        {type:"img",content: basesrc+key.advertisement_url},   // 图片
                        {content: key.link_url},  // 链接
                        {content: key.show_duration},   // 显示时间
                        {content: key.click_times},   // 点击次数
                        {content: show_position},   // 点击次数
                        {content: key.status == 1 ? '启用' : '禁用'},   //
                        {content: key.default_display == 1 ? '是' : '否'},   //
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_advertisement)) {
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/advertisement/advertisementDetail', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.update_advertisement)) {
                        operations.push({
                            content: "编辑",
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/advertisement/advertisementEdit', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.update_advertisement) && key.default_display == 2) {
                        operations.push({
                            content: "设置为默认广告",
                            class: "btn-warning",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定设置为默认广告?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/update_advertisement/hash/", {
                                                params: {
                                                    advertisement_id: id,
                                                    advertisement_info: {
                                                        default_display: 1
                                                    }
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal("设置默认广告成功!", "", "success");
                                                this.getGridData(params);
                                            } else {
                                                swal("设置默认广告失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.update_advertisement) && key.status == '1') {
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
                                        this.appHttpService.postData(this.uc.api.qc + "/update_advertisement/hash/", {
                                                params: {
                                                    advertisement_id: id,
                                                    advertisement_info: {
                                                        status: 2
                                                    }
                                                }
                                            }
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
                    };
                    if (this.uc.powerfun(this.uc.constant.update_advertisement) && key.status == '2') {
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
                                        this.appHttpService.postData(this.uc.api.qc + "/update_advertisement/hash/", {
                                                params: {
                                                    advertisement_id: id,
                                                    advertisement_info: {
                                                        status: 1
                                                    }
                                                }
                                            }
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
                    };
                    if (this.uc.powerfun(this.uc.constant.delete_advertisement)) {
                        operations.push({
                            content: "删除",
                            class: "btn-danger",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定删除?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/delete_advertisement/hash/", {
                                                params: {
                                                    advertisement_id: id,
                                                    advertisement_info: {
                                                        status: 1
                                                    }
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal("删除成功!", "", "success");
                                                this.getGridData(params);
                                            } else {
                                                swal("删除失败!", res.error_msg, "error");
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