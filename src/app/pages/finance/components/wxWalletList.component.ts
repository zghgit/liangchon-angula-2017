/**
 * Created by max on 2017/6/12.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;

@Component({
    selector: 'wx-wallet-list',
    templateUrl: '../views/wxWalletList.html',
    styleUrls:["../styles/wxWalletList.scss"]
})
export class WxWalletListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public hideRecord:boolean = true;
    public QRcode:string;

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        let data = this.appHttpService.getData(this.uc.api.qc+"get_foucs_wx_user_qrcode/hash/");

        data.subscribe(res=>{
            this.QRcode = res.data.src;
        })

        this.plugins.grid = {
            th: [
                {content: '用户ID', hidden: true},
                {content: '呢称'},
                {content: '状态'},
                {content: '时间'},
                {content: '操作'},
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_foucs_wyc_wx_user/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data.foucs_config;
                let list = data.list;
                console.log(list)
                if (list.length>0){
                    this.hideRecord = false;
                }else {
                    this.hideRecord = true;
                }
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.wx_user_data_id, hidden: true},
                        {content: key.nickname},
                        {content: key.status == 1 ? '启用' : '禁用'},
                        {content: key.create_time},
                    ];
                    let operations = [];
                    if (key.status ==1){
                        operations.push({
                            content: "禁用",
                            class: "btn-warning",
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
                                        this.appHttpService.postData(this.uc.api.qc + "/update_wx_user/hash/", {
                                                params: {
                                                    wx_user_id: id,
                                                    wx_user_info: {
                                                        status: '2'
                                                    }
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal("禁用成功!", "", "success");
                                                this.getGridData(params);
                                            }else {
                                                swal("禁用失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }else {
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
                                        this.appHttpService.postData(this.uc.api.qc + "/update_wx_user/hash/", {
                                                params: {
                                                    wx_user_id: id,
                                                    wx_user_info: {
                                                        status: '1'
                                                    }
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal("启用成功!", "", "success");
                                                this.getGridData(params);
                                            }else {
                                                swal("启用失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
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
                                    this.appHttpService.postData(this.uc.api.qc + "/delete_wx_user/hash/", {
                                            params: {
                                                wx_user_id: id
                                            }
                                        }
                                    ).subscribe(res=>{
                                        if (res.status){
                                            swal("删除成功!", "", "success");
                                            this.getGridData(params);
                                        }else {
                                            swal("删除失败!", res.error_msg, "error");
                                        }
                                    })
                                }
                            }, () => {
                            });

                        }
                    })
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