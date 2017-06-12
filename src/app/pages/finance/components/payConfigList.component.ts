/**
 * Created by max on 2017/6/12.
 */

import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'payconfig-list',
    templateUrl: '../views/payConfigList.html'
})
export class payConfigListComponent implements OnInit {
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.grid = {
            th: [
                {content: '支付ID', hidden: true},
                {content: '支付方式'},
                {content: '是否启用'},
                {content: '操作'}
            ],
            tbody: [],
        };
        this.getAilpayConfig();
        this.getWxpayConfig();
        this.getWalletConf();
    }

    public getAilpayConfig = function () {
        let data = this.appHttpService.getData(this.uc.api.qc + "/get_alipay_config/hash");
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data.ailpay_config;
                let tds: Array<any>;
                tds = [
                    {content: _data.alipay_config_id, hidden: true},
                    {content: '支付宝'},
                    {content: _data.status == 1 ? '启用' : '禁用'},
                ];
                let operations = [];
                operations.push({
                    content: "编辑",
                    class: "btn-primary",
                    click: (data) => {
                        this.router.navigateByUrl('pages/finance/alipayConfEdit');
                    }
                })
                tds.push({type: "operation", operation: operations})
                this.plugins.grid.tbody.push(tds)

            } else {
                let tds: Array<any>;
                tds = [
                    {content: "", hidden: true},
                    {content: '支付宝'},
                    {content: "--"},
                ];
                let operations = [];
                operations.push({
                    content: "新增",
                    class: "btn-success",
                    click: (data) => {
                        this.router.navigateByUrl('pages/finance/alipayConfAdd');
                    }
                })
                tds.push({type: "operation", operation: operations})
                this.plugins.grid.tbody.push(tds)
            }
        })
    };
    public getWxpayConfig = function () {
        let data = this.appHttpService.getData(this.uc.api.qc + "/get_wxpay_config/hash");
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data.wxpay_config;
                let tds: Array<any>;
                tds = [
                    {content: _data.wxpay_config_id, hidden: true},
                    {content: '微信公众号'},
                    {content: _data.status == 1 ? '启用' : '禁用'},
                ];
                let operations = [];
                operations.push({
                    content: "编辑",
                    class: "btn-primary",
                    click: (data) => {
                        this.router.navigateByUrl('pages/finance/wxPubConfEdit');
                    }
                })
                tds.push({type: "operation", operation: operations})
                this.plugins.grid.tbody.push(tds)

            } else {
                let tds: Array<any>;
                tds = [
                    {content: "", hidden: true},
                    {content: '微信公众号'},
                    {content: "--"},
                ];
                let operations = [];
                operations.push({
                    content: "新增",
                    class: "btn-success",
                    click: (data) => {
                        this.router.navigateByUrl('pages/finance/wxPubConfAdd');
                    }
                })
                tds.push({type: "operation", operation: operations})
                this.plugins.grid.tbody.push(tds)
            }
        })
    };
    public getWalletConf = function () {
        let tds: Array<any>;
        tds = [
            {content: "", hidden: true},
            {content: '微信零钱包'},
            {content: '启用'},
        ];
        let operations = [];
        operations.push({
            content: "编辑",
            class: "btn-primary",
            click: (data) => {
                this.router.navigateByUrl('pages/finance/wxWalletList');
            }
        })
        tds.push({type: "operation", operation: operations})
        this.plugins.grid.tbody.push(tds)
    };

    public pageBeChanged(event) {
        this.getAilpayConfig()
    }
}