/**
 * Created by max on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'commodity-detail',
    templateUrl: '../views/commodityDetail.html'
})
export class CommodityDetailComponent implements OnInit {
    public plugins: any = {
        table: {
            data: []
        }
    };

    constructor(public appHttpService: AppHttpService,
                public uc: UC,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_commodity/hash", {params: {commodity_id: params['id']}}));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                this.plugins.table.data = [
                    {
                        type: 'text',
                        label: '商品名称',
                        content: _data.commodity_name
                    },
                    {
                        type: 'text',
                        label: '商品描述',
                        content: _data.commodity_description
                    },
                    {
                        type: 'text',
                        label: '充电时长(分钟)',
                        content: _data.charge_duration
                    },
                    {
                        type: 'text',
                        label: '价格(元)',
                        content: _data.charge_price
                    },
                    {
                        type: 'text',
                        label: '启用状态',
                        content: _data.status == 1 ? '启用' : '禁用'
                    }
                ];
            } else {
                swal({
                    title: "获取商品信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }

}