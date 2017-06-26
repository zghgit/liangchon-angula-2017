/**
 * Created by max on 2017/5/9.
 */
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
declare var swal;
@Component({
    selector: 'equipmentConfig',
    templateUrl: '../views/equipmentConfig.html'
})
export class EquipmentConfigComponent implements OnInit {
    public oldParams: Array<any> = [];
    public device_no: string;
    public fields: Array<any>;
    public button;
    public newparams: any = {};
    public changeparams: Array<any> = [];
    public coin_number;
    public card_money;
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public dataService: DataService,
                public activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let isAdmin = this.dataService.getCookies("admin_flg");
        if (isAdmin == 1) {
            this.button = {
                class: 'btn-danger',
                content: '营业额清零',
                click: () => {

                }
            };
        }
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            this.device_no = res['id'];
            console.log(this.device_no);
        })
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_device_params_list/hash", {params: {device_no: params['id']}}));
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
                this.coin_number = _data.turnover.coin_number;
                this.card_money = _data.turnover.card_money;
                console.log(_data);
                this.oldParams.push({
                    key: 'heartbeat_cycle',
                    value: _data.heartbeat_cycle,
                    content: '心跳周期'
                });
                //----old_params 2
                this.oldParams.push({
                    key: 'server_port',
                    value: '',
                    content: '服务器端口'
                });
                //----old_params 3
                this.oldParams.push({
                    key: 'threshold',
                    value: _data.threshold,
                    content: '连接信号阈值'
                });
                //----old_params 4
                //this.oldParams.push({
                //    key:'signal_strength',
                //    value:_data.signal_strength,
                //    content:'现场信号强度'
                //});
                //----old_params 5
                this.oldParams.push({
                    key: 'electricity_meter_address',
                    value: _data.electricity_meter_address,
                    content: '电表地址'
                });
                //----old_params 6
                this.oldParams.push({
                    key: 'card_deduction',
                    value: _data.modify_parameter.card_deduction,
                    content: '刷卡扣费'
                });
                //----old_params 7
                this.oldParams.push({
                    key: 'card_time',
                    value: _data.modify_parameter.card_time,
                    content: '刷卡时间'
                });
                //----old_params 8
                this.oldParams.push({
                    key: 'coin_time',
                    value: _data.modify_parameter.coin_time,
                    content: '投币时间'
                });
                //----old_params 9
                this.oldParams.push({
                    key: 'standard_current',
                    value: _data.modify_parameter.standard_current,
                    content: '标准电流'
                });
                //----old_params 10
                this.oldParams.push({
                    key: 'maxinum_current',
                    value: _data.modify_parameter.maxinum_current,
                    content: '最大电流'
                });
                //----old_params 11
                this.oldParams.push({
                    key: 'delay',
                    value: _data.modify_parameter.delay,
                    content: '拔断延时'
                });
                //----old_params 12
                this.oldParams.push({
                    key: 'set_the_time',
                    value: '',
                    content: '设备时钟'
                });
                //----old_params 13
                this.oldParams.push({
                    key: 'coin_number',
                    value: _data.turnover.coin_number,
                    content: '投币次数'
                });
                //----old_params 14
                this.oldParams.push({
                    key: 'card_money',
                    value: _data.turnover.card_money,
                    content: '刷卡金额'
                });
                this.fields = [
                    {
                        label: "设备编号",
                        key: "device_no",
                        controlType: "input",
                        inputType: "text",
                        value: this.device_no,
                        disabled: true,
                        placeholder: "",
                    }, {
                        label: "心跳周期(分钟)",
                        key: "heartbeat_cycle",
                        controlType: "input",
                        inputType: "text",
                        value: _data.heartbeat_cycle,
                        placeholder: "请输入心跳周期",
                        validator: [
                            CustomValidators.min(1),
                            CustomValidators.max(10),
                        ],
                        errormsg: [
                            {type: "min", content: "心跳周期范围:(1-10)分钟"},
                            {type: "max", content: "心跳周期范围:(1-10)分钟"},
                        ]

                    }, {
                        label: "服务器端口",
                        key: "server_port",
                        controlType: "input",
                        inputType: "text",
                        value: _data.server_port,
                        placeholder: "请输入服务器端口",
                        validator: [
                            CustomValidators.min(1024),
                            CustomValidators.max(65535),
                        ],
                        errormsg: [
                            {type: "min", content: "服务器端口范围:(1024-65535)"},
                            {type: "max", content: "服务器端口范围:(1024-65535)"},
                        ]
                    }, {
                        label: "连接信号阈值",
                        key: "threshold",
                        controlType: "input",
                        inputType: "text",
                        value: _data.threshold,
                        placeholder: "请输入连接信号阈值",
                        validator: [
                            CustomValidators.min(0),
                            CustomValidators.max(2550),
                        ],
                        errormsg: [
                            {type: "min", content: "连接信号阈值范围:(0-20)"},
                            {type: "max", content: "连接信号阈值范围:(0-20)"},
                        ]
                    }, {
                        label: "现场信号强度",
                        key: "signal_strength",
                        controlType: "input",
                        inputType: "text",
                        value: _data.signal_strength,
                        disabled: true,
                        placeholder: "请输入连接信号阈值"
                    }, {
                        label: "电表地址",
                        key: "electricity_meter_address",
                        controlType: "input",
                        inputType: "text",
                        value: _data.electricity_meter_address,
                        placeholder: "请输入12位电表地址"
                    }, {
                        label: "刷卡扣费(元)",
                        key: "card_deduction",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.card_deduction,
                        placeholder: "请输入一次刷卡扣费的金额",
                        validator: [
                            CustomValidators.max(25.5),
                        ],
                        errormsg: [
                            {type: "max", content: "扣费金额范围:(0-25.5)"},
                        ]
                    }, {
                        label: "刷卡时间(分钟)",
                        key: "card_time",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.card_time,
                        placeholder: "请输入刷卡一次增加的时间",
                        validator: [
                            CustomValidators.max(2550),
                        ],
                        errormsg: [
                            {type: "max", content: "刷卡时间范围:(0-2550)分钟"},
                        ]
                    }, {
                        label: "投币时间(分钟)",
                        key: "coin_time",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.coin_time,
                        placeholder: "请输入投币一次增加的时间",
                        validator: [
                            CustomValidators.max(2550),
                        ],
                        errormsg: [
                            {type: "max", content: "投币时间范围:(0-2550)分钟"},
                        ]
                    }, {
                        label: "标准电流(安培/A)",
                        key: "standard_current",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.standard_current,
                        placeholder: "请输入标准电流",
                        validator: [
                            CustomValidators.max(25.5),
                        ],
                        errormsg: [
                            {type: "max", content: "最大电流范围:(0-25.5)"},
                        ]
                    }, {
                        label: "最大电流(安培/A)",
                        key: "maxinum_current",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.maxinum_current,
                        placeholder: "请输入最大电流",
                        validator: [
                            CustomValidators.max(25.5),
                        ],
                        errormsg: [
                            {type: "max", content: "最大电流范围:(0-25.5)"},
                        ]
                    }, {
                        label: "拔断延时(秒)",
                        key: "delay",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.delay,
                        placeholder: "请输入拔断延时",
                        validator: [
                            CustomValidators.min(0),
                            CustomValidators.max(255),
                        ],
                        errormsg: [
                            {type: "min", content: "拔断延时范围:(0-255)"},
                            {type: "max", content: "拔断延时范围:(0-255)"},
                        ]
                    }, {
                        label: "设备时钟",
                        key: "set_the_time",
                        controlType: "time",
                        value: "",
                        config: {
                            showTimePicker: true,
                            format: 1,
                        },
                        placeholder: "请点击选择日期",
                    }, {
                        label: "投币次数(次)",
                        key: "coin_number",
                        controlType: "input",
                        inputType: "text",
                        value: _data.turnover.coin_number,
                        disabled: true,
                        placeholder: ""
                    }, {
                        label: "刷卡金额(元)",
                        key: "card_money",
                        controlType: "input",
                        inputType: "text",
                        value: _data.turnover.card_money,
                        disabled: true,
                        placeholder: ""
                    },
                ];
            } else {
                swal({
                    title: "获取设备参数配置失败!",
                    text: res.error_msg,
                    type: "error",
                    timer: "1500"
                });
            }
        })
    }

    saveData({value}={value}) {
        let empty_turnover = 0;
        if (this.coin_number == 0 || this.card_money == 0) {
            empty_turnover = 1;
        }

        this.newparams = {
            device_no: this.device_no,
            heartbeat_cycle: value.heartbeat_cycle,
            server_port: value.server_port||"",
            threshold: value.threshold,
            electricity_meter_address: value.electricity_meter_address,
            card_deduction: value.card_deduction,
            card_time: value.card_time,
            coin_time: value.coin_time,
            standard_current: value.standard_current,
            maxinum_current: value.maxinum_current,
            delay: value.delay,
            set_the_time: value.set_the_time,
            coin_number: this.coin_number,
            card_money: this.card_money,
            empty_turnover: empty_turnover
        }
        for(let olditem of this.oldParams){
            for(let newitem in this.newparams){
                if(olditem.key==newitem){
                    if(olditem.value!=this.newparams[newitem]){
                        olditem.new_value=this.newparams[newitem];
                        this.changeparams.push(olditem)
                    }
                }
            }
        }
        console.log(this.changeparams)
    }

}