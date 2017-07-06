/**
 * Created by max on 2017/6/5.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'app-version-list',
    templateUrl: '../views/appVersionList.html',
})
export class AppVersionListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.grid = {
            th: [
                {content: '版本ID', hidden: true},
                {content: '发布时间'},
                {content: '版本号'},
                {content: '强制更新'},
                {content: '手机类型'},
                {content: '版本链接'},
                {content: '版本描述'},
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_version_list", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.ver_mgr_id, hidden: true},
                        {content: key.create_time},
                        {content: key.ver_code},
                        {content: key.force_update_name},
                        {content: key.phone_type_name},
                        {content: key.ver_link},
                        {content: key.ver_description},
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_commodity)){
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/appManagement/appVersionDetail', id]);
                            }
                        })
                    }
                    if(this.uc.powerfun(this.uc.constant.update_commodity)){
                        operations.push({
                            content: "编辑",
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/appManagement/appVersionEdit', id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.delete_commodity)) {
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
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/delete_version/", {
                                                params: {
                                                    ver_mgr_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal({
                                                    title: "删除成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer:"2000"
                                                });
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
                    }
                    tds.push({type: "operation", operation: operations})
                    this.plugins.grid.tbody.push(tds)
                }
            }else {
                swal({
                    title: "获取版本信息失败!",
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
            search_by: {},
        })
    }


}