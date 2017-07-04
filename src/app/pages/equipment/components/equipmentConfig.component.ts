/**
 * Created by max on 2017/5/9.
 */
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
import {TenValidator} from  "../../../plugins/validators/tenValidator";

declare var swal;
@Component({
    selector: 'equipmentConfig',
    templateUrl: '../views/equipmentConfig.html',
    styleUrls: ['../styles/equipmentConfig.scss']
})
export class EquipmentConfigComponent implements OnInit {
    public oldParams: Array<any> = [];
    public device_no: string;
    public fields: Array<any>;
    public button;
    public newparams: any = {};
    public changeparams: Array<any> = [];
    public showchangeparams:boolean=false;
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
        if (isAdmin == 1&&(this.coin_number!=0||this.card_money!=0)) {
            this.button = {
                class: 'btn-danger',
                content: '营业额清零',
                click: () => {
                    this.fields[13].value = 0;
                    this.fields[14].value = 0;
                    this.coin_number =0;
                    this.card_money =0;
                    swal({
                        title: "提示!",
                        text: "营业额已清零,请重新提交配置",
                        type: "success",
                    });
                }
            };
        }
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            this.device_no = res['id'];
        })
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_device_params_list", {params: {device_no: params['id']}}));
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
                this.coin_number = _data.turnover.coin_number;
                this.card_money = _data.turnover.card_money;
                //----old_params -1
                this.oldParams.push({
                    key: 'device_no',
                    value: this.device_no,
                    content: '设备编号'
                });
                //----old_params 0
                this.oldParams.push({
                    key: 'heartbeat_cycle',
                    value: _data.heartbeat_cycle,
                    content: '心跳周期'
                });
                //----old_params 1
                this.oldParams.push({
                    key: 'server_port',
                    value: '',
                    content: '服务器端口'
                });
                //----old_params 2
                this.oldParams.push({
                    key: 'threshold',
                    value: _data.threshold,
                    content: '连接信号阈值'
                });
                //----old_params 3
                this.oldParams.push({
                    key: 'electricity_meter_address',
                    value: _data.electricity_meter_address,
                    content: '电表地址'
                });
                //----old_params 4
                this.oldParams.push({
                    key: 'card_deduction',
                    value: _data.modify_parameter.card_deduction,
                    content: '刷卡扣费'
                });
                //----old_params 5
                this.oldParams.push({
                    key: 'card_time',
                    value: _data.modify_parameter.card_time,
                    content: '刷卡时间'
                });
                //----old_params 6
                this.oldParams.push({
                    key: 'coin_time',
                    value: _data.modify_parameter.coin_time,
                    content: '投币时间'
                });
                //----old_params 7
                this.oldParams.push({
                    key: 'standard_current',
                    value: _data.modify_parameter.standard_current,
                    content: '标准电流'
                });
                //----old_params 8
                this.oldParams.push({
                    key: 'maxinum_current',
                    value: _data.modify_parameter.maxinum_current,
                    content: '最大电流'
                });
                //----old_params 9
                this.oldParams.push({
                    key: 'delay',
                    value: _data.modify_parameter.delay,
                    content: '拔断延时'
                });
                //----old_params 10
                this.oldParams.push({
                    key: 'set_the_time',
                    value: '',
                    content: '设备时钟'
                });
                //----old_params 11
                this.oldParams.push({
                    key: 'coin_number',
                    value: _data.turnover.coin_number,
                    content: '投币次数'
                });
                //----old_params 12
                this.oldParams.push({
                    key: 'card_money',
                    value: _data.turnover.card_money,
                    content: '刷卡金额'
                });
                this.fields = [
                    {
                        title:"基本配置",
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
                            Validators.pattern('^[0-9]*$'),
                            CustomValidators.range([1, 10]),
                        ],
                        errormsg: [
                            {type: "range", content: "心跳周期范围:(1-10)分钟"},
                            {type: "pattern", content: "心跳周期只能是整数"},
                        ]

                    }, {
                        label: "服务器端口",
                        key: "server_port",
                        controlType: "input",
                        inputType: "text",
                        value: _data.server_port,
                        placeholder: "请输入服务器端口",
                        validator: [
                            Validators.pattern('^[0-9]*$'),
                            CustomValidators.range([1024, 65535]),

                        ],
                        errormsg: [
                            {type: "range", content: "服务器端口范围:(1024-65535)"},
                            {type: "pattern", content: "服务器端口只能是整数"},
                        ]
                    }, {
                        label: "连接信号阈值",
                        key: "threshold",
                        controlType: "input",
                        inputType: "text",
                        value: _data.threshold,
                        placeholder: "请输入连接信号阈值",
                        validator: [
                            Validators.pattern('^[0-9]+\.?[0-9]{0,2}$'),
                            CustomValidators.range([0, 20]),
                        ],
                        errormsg: [
                            {type: "range", content: "连接信号阈值范围:(0-20)"},
                            {type: "pattern", content: "连接信号阈值必需是数字；如：14.00"},
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
                        placeholder: "请输入12位电表地址",
                        validator: [
                            Validators.pattern('^[a-zA-Z0-9]{12}$'),
                        ],
                        errormsg: [
                            {type: "pattern", content: "电表地址是12位数字或字母，不足12位前面补0；如：00as12344213"},
                        ]
                    }, {
                        label: "刷卡扣费(元)",
                        key: "card_deduction",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.card_deduction,
                        placeholder: "请输入一次刷卡扣费的金额",
                        validator: [
                            CustomValidators.range([0.1, 25.5]),
                            Validators.pattern('^[0-9]+\.?[0-9]{0,1}$'),
                        ],
                        errormsg: [
                            {type: "range", content: "扣费金额范围:(0.1-25.5)"},
                            {type: "pattern", content: "扣费金额只能是数字，保留两位有效数字；如：0.1"},

                        ]
                    }, {
                        label: "刷卡时间(分钟)",
                        key: "card_time",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.card_time,
                        placeholder: "请输入刷卡一次增加的时间",
                        validator: [
                            CustomValidators.range([10, 2550]),
                            TenValidator
                        ],
                        errormsg: [
                            {type: "range", content: "刷卡时间范围:(10-2550)分钟"},
                            {type: "TenValidator", content: "刷卡时间范围只能是10的倍数"},
                        ]
                    }, {
                        label: "投币时间(分钟)",
                        key: "coin_time",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.coin_time,
                        placeholder: "请输入投币一次增加的时间",
                        validator: [
                            CustomValidators.range([10, 2550]),
                            TenValidator
                        ],
                        errormsg: [
                            {type: "range", content: "投币时间范围:(10-2550)分钟"},
                            {type: "TenValidator", content: "投币时间范围只能是10的倍数"},
                        ]
                    }, {
                        label: "标准电流(安培/A)",
                        key: "standard_current",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.standard_current,
                        placeholder: "请输入标准电流",
                        validator: [
                            CustomValidators.range([0.1, 25.5]),
                            Validators.pattern('^[0-9]+\.?[0-9]{0,1}$'),
                        ],
                        errormsg: [
                            {type: "range", content: "标准电流范围:(0.1-25.5)"},
                            {type: "pattern", content: "标准电流只能是数字，保留一位有效数字；如：0.1A"},
                        ]
                    }, {
                        label: "最大电流(安培/A)",
                        key: "maxinum_current",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.maxinum_current,
                        placeholder: "请输入最大电流",
                        validator: [
                            CustomValidators.range([0.1, 25.5]),
                            Validators.pattern('^[0-9]+\.?[0-9]{0,1}$'),
                        ],
                        errormsg: [
                            {type: "range", content: "最大电流范围:(0.1-25.5)"},
                            {type: "pattern", content: "最大电流只能是数字，保留一位有效数字；如：0.1A"},

                        ]
                    }, {
                        label: "拔断延时(秒)",
                        key: "delay",
                        controlType: "input",
                        inputType: "text",
                        value: _data.modify_parameter.delay,
                        placeholder: "请输入拔断延时",
                        validator: [
                            CustomValidators.range([0, 255]),
                            Validators.pattern('^[0-9]+$'),

                        ],
                        errormsg: [
                            {type: "range", content: "拔断延时范围:(0-255)"},
                            {type: "pattern", content: "拔断延时只能是数字；如：1秒"},
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
                        title:"营业额统计",
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
                    timer:"2000"
                });
            }
        })
    }

    saveData({value}={value}) {
        this.changeparams=[]
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
        };
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
        this.showchangeparams = true;
    }
    upParams(){
        this.appHttpService.postData(this.uc.api.qc + "/set_device_params", {params:this.newparams}).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/equipment/equipmentList');
                } else {
                    swal("修改参数配置失败", res.error_msg, "error")
                }
            }
        )

    }
    closeZoom(){
        this.showchangeparams = false;
    }

}