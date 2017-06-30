/**
 * Created by max on 2017/6/5.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'app-information-list',
    templateUrl: '../views/appInformationList.html',
    styleUrls:["../styles/appInformationList.scss"]
})
export class AppInformationComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        if(this.uc.powerfun(this.uc.constant.add_commodity)){
            this.plugins.button = {
                class:'btn-primary',
                content:'新增资讯',
                click:()=>{
                    this.router.navigateByUrl('pages/appManagement/appInformationAdd');
                }
            };
        }
        this.plugins.grid = {
            th: [
                {content: '用户ID', hidden: true},
                {content: '标题'},
                {content: '内容'},
                {content: '发布时间'},
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_information_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    let content=key.information_content||"";
                    let reg=/(<[^<]*>)|(\&nbsp\;)/gi;
                    tds = [
                        {content: key.information_id, hidden: true},
                        {content: key.information_title},  // 用户账号
                        {content: content.replace(reg,'')},   // 上级
                        {content: key.create_time},  // 用户类型
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_commodity)){
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/appManagement/appInformationDetail', id]);
                            }
                        })
                    }
                    if(this.uc.powerfun(this.uc.constant.update_commodity)){
                        operations.push({
                            content: "编辑",
                            class: "btn-primary",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/appManagement/appInformationEdit', id]);
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
                                        this.appHttpService.postData(this.uc.api.qc + "/delete_information/hash/", {
                                                params: {
                                                    information_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal({
                                                    title: "删除成功!",
                                                    text: "",
                                                    type: "success",
                                                    timer:"1500"
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
                    title: "获取资讯信息失败!",
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


}