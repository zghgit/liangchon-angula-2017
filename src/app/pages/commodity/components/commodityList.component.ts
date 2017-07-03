/**
 * Created by max on 2017/5/5.
 */

import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'commodity-list',
    templateUrl: '../views/commodityList.html',
    styleUrls:["../styles/commodityList.scss"]
})
export class CommodityListComponent implements OnInit {
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
                content:'新增商品',
                click:()=>{
                    this.router.navigateByUrl('pages/commodity/commodityAdd');
                }
            };
        }
        this.plugins.grid = {
            th: [
                {content: '商品名称ID', hidden: true},
                {content: '商品名称'},
                {content: '商品描述'},
                {content: '充电时长(分钟)'},
                {content: '价格(元)'},
                {content: '启用状态'},
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_commodity_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.commodity_id, hidden: true},
                        {content: key.commodity_name},
                        {content: key.commodity_description},
                        {content: key.charge_duration},
                        {content: key.charge_price},
                        {content: key.status==1?'启用':'禁用'}
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_commodity)){
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: () => {
                                this.router.navigate(['pages/commodity/commodityDetail', key.commodity_id]);
                            }
                        })
                    }
                    if(this.uc.powerfun(this.uc.constant.update_commodity)){
                        operations.push({
                            content: "编辑",
                            class: "btn-primary",
                            click: () => {
                                this.router.navigate(['pages/commodity/commodityEdit', key.commodity_id]);
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
                                        this.appHttpService.postData(this.uc.api.qc + "/delete_commodity/hash/", {
                                                params: {
                                                    commodity_id: id
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
                    title: "获取商品信息失败!",
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