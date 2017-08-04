import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import * as moment from 'moment';

declare var swal;
@Component({
    selector: 'cashWithdrawal',
    templateUrl: '../views/cashWithdrawal.html',
    styleUrls: ["../styles/cashWithdrawal.scss"]
})
export class CashWithdrawalComponent implements OnInit {
    public cannotupdata: boolean = false;
    public now: number = 1;
    public grids: any = {};
    public orderSet = new Set();//内容集合
    public orderTip: string = "";
    public total_sum;
    public money = 0;
    public applicant_name: string="";
    public applicant_account: string="";
    public apply_type: number;//1。全选；2。部分
    public plugins: any = {};
    public searchBy: any = {};

    public radioModel = {
        value: "2",
        name: "pay_type",
        options: [
            {value: "2", content: "微信"}
        ]
    };
    public wx: any = {
        value: "0",
        placeholder:"请选择微信支付账户",
        options: []
    };

    constructor(public appHttpService: AppHttpService,
                public uc: UC,
                public router: Router) {
    }

    ngOnInit() {
        let validTime = JSON.parse(localStorage.getItem("validTime"));
        this.orderTip = '请在每月的' + validTime.start_time + '-' + validTime.end_time + '号提现!';
        //订单信息及全选逻辑
        this.grids = {
            th: {
                array: [
                    {content: '支付ID', hidden: true},
                    {type: "checkbox", content: '全选'},
                    {content: '单号'},
                    {content: '设备'},
                    {content: '可提现金额(元)'}
                ],
                checked: false,
                click: (data) => {
                    //因为传值的时候先取反再传值,所以判断的时候模型的checked状态还没有改变
                    if (!data.th.checked) {
                        //全选处理
                        this.apply_type = 1;
                        this.money = 0;
                        for (let item of data.tbody) {
                            item.checked = true;
                            this.orderSet.add(item.array[1].value);
                            this.money += Number(item.array[4].content);
                        }
                    } else {
                        //非全选处理
                        this.apply_type = 2;
                        for (let item of data.tbody) {
                            item.checked = false;
                            this.orderSet.clear();
                            this.money = 0;
                        }
                    }
                }
            },
            tbody: []
        };
        this.plugins.search = [
            {
                title: "开始时间",
                key: "start_time",
                controlType: "time",
                value: "",
                config: {
                    showTimePicker: false,
                    format: 0,
                },
                placeholder: "请点击选择日期",
            }, {
                title: "结束时间",
                key: "end_time",
                controlType: "time",
                value: "",
                config: {
                    showTimePicker: false,
                    format: 0,
                },
                placeholder: "请点击选择日期",
            }
        ];
        this.plugins.buttons = [
             {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        start_time,
                        end_time,
                    } = value;
                    if (start_time && !end_time || !start_time && end_time) {
                        // swal("搜索失败","开始时间和结束时间要一起填写!","error");
                        swal({
                            title: "提示!",
                            text: "开始时间和结束时间要一起填写",
                            type: "error",
                            timer:"2000"
                        });
                        return
                    }
                    if (start_time > end_time) {
                        swal({
                            title: "开始时间不能大开结束时间!",
                            text: "提示",
                            type: "error",
                            timer:"2000"
                        });
                        return
                    }
                    this.searchBy = {
                        start_time: start_time ? moment(start_time).format('YYYY-MM-DD 00:00:00') : '',
                        end_time: end_time ? moment(end_time).format('YYYY-MM-DD 23:59:59') : '',
                    }
                    this.now = 1;
                    this.getGridData({
                        page_now: this.now,
                        limit: 20000,
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
                        limit: 20000,
                        sort_by: 'create_time',
                        sort_type: 'desc',
                        search_by: this.searchBy,

                    })
                }
            },
        ];
        this.getGridData({
            page_now: this.now,
            limit: 20000,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},

        });
        this.getWX({
            page_now: 1,
            limit: 20000,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},

        });

    }

    //获取订单信息
    public getGridData(params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_can_withdraw_cash_list", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.order_list;
                //可提现总额
                this.total_sum = data.total_sum;
                this.grids.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.order_id, hidden: true},
                        {type: "checkbox", value: key.order_id},
                        {content: key.order_no},
                        {content: key.device_name},
                        {content: key.order_sum}
                    ];
                    this.grids.tbody.push({
                        array: tds,
                        checked: false,
                        click: (data) => {
                            data.checked = !data.checked;
                            if (data.checked) {
                                this.orderSet.add(data.array[1].value)
                                this.money += Number(data.array[4].content)
                            } else {
                                this.orderSet.delete(data.array[1].value)
                                this.money -= Number(data.array[4].content)
                            }
                            if (this.orderSet.size == this.grids.tbody.length) {
                                this.grids.th.checked = true;
                                this.apply_type = 1;
                            } else {
                                this.grids.th.checked = false;
                                this.apply_type = 2;
                            }
                        }
                    })
                }
            } else {
                swal({
                    title: "获取订单信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }

    //获取微信支付信息
    public getWX(params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_foucs_wyc_wx_user", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data.foucs_config;
                let list = data.list;
                let option = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].status == 1) {
                        option.push({
                            geo_id: list[i].wx_user_data_id,
                            name: list[i].nickname,
                        })
                    }
                }
                this.wx.options = option;

            } else {
                swal({
                    title: "申请提现失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }

    //选择回填
    afresh(ev) {
        this.applicant_account = ev.content;
        this.applicant_name = ev.value;
    }

    updataform() {
        let device_ids = Array.from(this.orderSet);
        if (device_ids.length == 0) {
            swal({
                title: "请添加提现订单!",
                text: "",
                type: "error",
                timer:"2000"
            });
            return
        } else {
        }
        if (this.radioModel.value=="2"&&this.applicant_account==""){
            swal({
                title: "请选择微信支付账户!",
                text: "",
                type: "error",
                timer:"2000"
            });
            return
        }
        let params = {
            params: {
                pay_type: this.radioModel.value,//1。支付宝 2。微信
                apply_type: this.apply_type,//1。全选；2。部分
                order_ids: device_ids.join(";"),
                applicant_account: this.applicant_account,
                applicant_name: this.applicant_name,
            }
        }
        this.appHttpService.postData(this.uc.api.qc + "/withdraw_cash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/equipment/equipmentList');
                } else {
                    swal("申请提现失败", res.error_msg, "error")
                }
            }
        )
    }

    //分页
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