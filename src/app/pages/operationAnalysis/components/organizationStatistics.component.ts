/**
 * Created by max on 2017/6/5.
 */

import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'organization-statistics-list',
    templateUrl: '../views/organizationStatistics.html'
})
export class OrganizationStatisticsComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.grid = {
            th: [
                {content: 'ID', hidden: true},
                {content: '机构名称'},
                {content: '机构类型'},
                {content: '设备名称'},
                {content: '设备类型'},
                {content: '支付宝(元)'},
                {content: '微信(元)'},
                {content: '充点'},
                {content: '移动营业额(元)'},
                {content: '消费类型'},
                {content: '刷卡额(元)'},
                {content: '投币额(元)'},
                {content: '地址'},
                {content: '总耗电量(度)'},
                {content: '单价(元)'},
                {content: '设备电费成本(元)'},
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1,
                totalItems: 1
            }
        }
        this.plugins.grid2 = {
            caption:"营业统计信息",
            th: [
                {content: '支付宝(元)'},
                {content: '微信(元)'},
                {content: '充点'},
                {content: '移动营业额(元)'},
                {content: '刷卡额(元)'},
                {content: '投币额(元)'},
                {content: '总耗电量(度)'},
                {content: '设备电费成本(元)'},
            ],
            tbody: []
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_statistics_charge_station_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                this.plugins.grid2.tbody = [];
                let count = data.count;
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.order_id, hidden: true},
                        {content: key.user_name},
                        {content: key.role_name},
                        {content: key.device_name},
                        {content: key.device_type_name},
                        {content: key.alipay_sum},
                        {content: key.wxpay_sum},
                        {content: key.yun_sum},
                        {content: key.charge_order_sum},
                        {content: key.spendig_type==1?'充电':'充值'},
                        {content: key.card_sum},
                        {content: key.coin_sum},
                        {content: key.device_address},
                        {content: key.charge_powear},
                        {content: key.electricity},
                        {content: key.electricity_cost}
                    ];
                    this.plugins.grid.tbody.push(tds)
                }
                if (count){
                    let td2 = [
                        {content: count.ali_pay_count||0},
                        {content: count.wx_pay_count||0},
                        {content: count.yun_pay_count||0},
                        {content: count.charge_order_count||0},
                        {content: count.card_sum_count||0},
                        {content: count.coin_sum_count||0},
                        {content: count.charge_power_count||0},
                        {content: count.electricity_cost_count||0},
                    ]
                    this.plugins.grid2.tbody.push(td2)
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