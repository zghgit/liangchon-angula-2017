/**
 * Created by max on 2017/4/24.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class UC {
    public version = '0.0.1';
    public api = {
        qc: (location.origin || location.protocol + "/" + location.host) + '/api/wyc',
        pub: (location.origin || location.host) + '/api/pub'
    };
    public reg = {
        PSW: "^[A-Za-z0-9._!@#]{6,16}$",
        //最大额度
        MAX_NUMBER: 1000000,
        // 有两位小数的正实数
        ARITHMETIC_NUMBER: "^[0-9]+(.[0-9]{1,2})?$",
        // 正整数验证
        NATURAL_NUMBER: "^[0-9]*[1-9][0-9]*$",
        // 正数&最大允许小数点后两位
        REBATE_NUMBER: "^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$",
        // 正数&最大允许小数点后三位
        PRICE_NUMBER: "^(0|[1-9][0-9]{0,9})(\.[0-9]{1,3})?$",
        //以下三项移动了/app/plugins/validator/*
        //手机号
        MOBILE_NUMBER: "^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^1\d{10}$)|^[400|800]\d{7,9}$",
        //email
        EMAIL: "^\w+([\.-]?\w+)?@\w+([\.-]?\w+)?(\.\w{2,6})+$",
        //url
        W_URL: "^(http|https|ftp)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^/][a-zA-Z0-9\.\,\?\'\\/\+&amp;%\$#\=~_\-@]*)*$"
    };
    public constant = {
        start_user: "api/wyc/api/start_user",//启用用户
        disable_user: "api/wyc/api/disable_user",//禁用用户
        add_sub_user: "api/wyc/api/add_sub_user",// "添加子账户信息",
        get_sub_user: "api/wyc/api/get_sub_user",// "获取子账户信息",
        get_sub_user_list: "api/wyc/api/get_sub_user_list",// "获取子账户信息列表",
        update_sub_user: "api/wyc/api/update_sub_user",// "更新子账户信息",
        update_sub_user_password: "api/wyc/api/update_sub_user_password",// "更新子账户密码",
        delete_sub_user: "api/wyc/api/delete_sub_user",// "删除子账户",
        add_city_partner_user: "api/wyc/api/add_city_partner_user",// "添加城市合伙人信息",
        get_city_partner_user: "api/wyc/api/get_city_partner_user",// "获取城市合伙人信息",
        get_city_partner_user_list: "api/wyc/api/get_city_partner_user_list",// "获取城市合伙人信息列表",
        update_city_partner_user: "api/wyc/api/update_city_partner_user",// "更新城市合伙人信息",
        delete_city_partner_user: "api/wyc/api/delete_city_partner_user",// "删除城市合伙人",
        add_agent_user: "api/wyc/api/add_agent_user",// "添加代理商信息",
        get_agent_user: "api/wyc/api/get_agent_user",// "获取代理商信息",
        get_agent_user_list: "api/wyc/api/get_agent_user_list",// "获取代理商信息列表",
        update_agent_user: "api/wyc/api/update_agent_user",// "更新代理商信息",
        delete_agent_user: "api/wyc/api/delete_agent_user",// "删除代理商",
        add_commodity: "api/wyc/api/add_commodity",// "添加商品信息",
        get_commodity: "api/wyc/api/get_commodity",// "获取商品信息",
        get_commodity_list: "api/wyc/api/get_commodity_list",// "获取商品信息列表",
        update_commodity: "api/wyc/api/update_commodity",// "更新商品信息",
        delete_commodity: "api/wyc/api/delete_commodity",// "删除商品",
        add_device: "api/wyc/api/add_device",// "wyc登录设备信息",
        get_device_list: "api/wyc/api/get_device_list",// "获取设备列表",
        update_device: "api/wyc/api/update_device",// "更新设备信息",
        disable_device: "api/wyc/api/disable_device",// "禁止设备",
        get_device: "api/wyc/api/get_device",// "获去设备",
        validate_device_no: "api/wyc/api/validate_device_no",// "校验设备编号",
        start_device: "api/wyc/api/start_device",// "启用设备",
        download_device_template: "api/wyc/api/download_device_template",// "下载批量上传模板",
        create_device_by_excel: "api/wyc/api/create_device_by_excel",// "批量上传设备",
        generate_qr_code: "api/wyc/api/generate_qr_code",// "生成二维码",
        batch_set_device: "api/wyc/api/batch_set_device",// "批量设置",
        get_device_net_log_list: "api/wyc/api/get_device_net_log_list",// "获取上下线记录",
        download_device_info: "api/wyc/api/download_device_info",// "下载设备信息",
        delete_device: "api/wyc/api/delete_device",// "删除设备信息",
        get_order_list: "api/wyc/api/get_order_list",// "获取订单一览",
        get_order_info: "api/wyc/api/get_order_info",// "获取订单信息",
        download_order_info: "api/wyc/api/download_order_info",// "下载订单信息",
        order_refund: "api/wyc/api/order_refund",// "订单退费",
        order_finish: "api/wyc/api/order_finish",// "订单完成",
        withdraw_cash: "api/wyc/api/withdraw_cash",//申请提现
        accept_withdraw_cash: "api/wyc/api/accept_withdraw_cash",// "通过申请提现",
        reject_withdraw_cash: "api/wyc/api/reject_withdraw_cash",// "拒绝提现申请",
        get_withdraw_cash_list: "api/wyc/api/get_withdraw_cash_list",// "获取提现申请列表",
        paid_withdraw_cash: "api/wyc/api/paid_withdraw_cash",// "已打款",
        get_can_withdraw_cash_list: "api/wyc/api/get_can_withdraw_cash_list",// "获取我可以提现订单列表",
        get_withdraw_cash_info: "api/wyc/api/get_withdraw_cash_info",// "获取提现详情",
        add_advertisement: "api/wyc/api/add_advertisement",// "添加广告",
        update_advertisement: "api/wyc/api/update_advertisement",// "更新广告",
        delete_advertisement: "api/wyc/api/delete_advertisement",// "删除广告",
        get_advertisement: "api/wyc/api/get_advertisement",// "获取广告",
        get_advertisement_list: "api/wyc/api/get_advertisement_list",// "获取广告列表",
        update_advertisement_to_zero: "api/wyc/api/update_advertisement_to_zero",// "修改广告的点击次数",
        disable_or_enable_advertisement: "api/wyc/api/disable_or_enable_advertisement",// "禁用或者启用广告",
        get_app_user_list: "api/wyc/api/get_app_user_list",// "获取app用户列表",
        get_app_user: "api/wyc/api/get_app_user",// "获取app用户",
        delete_app_user: "api/wyc/api/delete_app_user",// "删除app用户",
        get_deposit_detail_list: "api/wyc/api/get_deposit_detail_list",// "获取app用户充值记录一览",
        get_app_user_deposit_detail: "api/wyc/api/get_app_user_deposit_detail",// "获取app用户充值记录",
        push_message_to_app_user: "api/wyc/api/push_message_to_app_user",// "消息推送给app用户",
        push_message_to_app: "api/wyc/api/push_message_to_app",// "消息推送给app用户",
        get_complained_list: "api/wyc/api/get_complained_list",// "获得申诉列表",
        get_complained: "api/wyc/api/get_complained",// "获得申诉详情",
        update_complained: "api/wyc/api/update_complained",// " 更新申诉信息",
        add_complained: "api/wyc/api/add_complained",// "添加申诉",
        add_information: "api/wyc/api/add_information",// "添加资讯信息",
        get_information: "api/wyc/api/get_information",// "获取资讯信息",
        update_information: "api/wyc/api/update_information",// "更新资讯信息",
        delete_information: "api/wyc/api/delete_information",// "删除资讯信息",
        get_information_list: "api/wyc/api/get_information_list",// "资讯信息列表",
        add_alipay_config: "api/wyc/api/add_alipay_config",// "添加支付宝配置",
        get_alipay_config: "api/wyc/api/get_alipay_config",// "获取支付宝配置信息",
        update_alipay_config: "api/wyc/api/update_alipay_config",// " 更新支付宝配置信息",
        add_wxpay_config: "api/wyc/api/add_wxpay_config",// "添加微信配置信息",
        get_wxpay_config: "api/wyc/api/get_wxpay_config",// "获取微信宝配置信息",
        update_wxpay_config: "api/wyc/api/update_wxpay_config",// "更新微信配置信息",
        add_foucs_wyc_wx_user: "api/wyc/api/add_foucs_wyc_wx_user",// "绑定微信零钱包",
        get_foucs_wyc_wx_user: "api/wyc/api/get_foucs_wyc_wx_user",// "获取微信零钱包用户数据",
        update_foucs_wyc_wx_user: "api/wyc/api/update_foucs_wyc_wx_user",// "更新微信零钱包用户数据",
        get_foucs_wx_user_qrcode: "api/wyc/api/get_foucs_wx_user_qrcode",// "获得绑定二维码",
        get_device_error_log_list: "api/wyc/api/get_device_error_log_list",// "获取设备故障信息列表",
        get_statistics_charge_station_list: "api/wyc/api/get_statistics_charge_station_list",// "统计商户、代理商、城市合伙人统计电量",
        set_system_config: "api/wyc/api/set_system_config",// "设定系统参数",
        get_action_log_list: "api/wyc/api/get_action_log_list",// "获取系统日志列表",
        get_system_config: "api/wyc/api/get_system_config",// "获取系统参数",
        update_system_config: "api/wyc/api/update_system_config",// "修改系统参数"
        get_business_user: "api/wyc/api/get_business_user",//获得商户信息
        update_business_user: "api/wyc/api/update_business_user",//更新商户信息
        device_unbundling: "api/wyc/api/device_unbundling",//解绑设备
        update_app_user: "api/wyc/api/update_app_user",//更新app用户信息
        add_business_user: "api/wyc/api/add_business_user",//添加商户
        device_binding: "api/wyc/api/device_binding",//解绑设备
        get_user: "api/wyc/api/get_user",//获取个人信息
        update_user_info: "api/wyc/api/update_user_info",//更新个人信息
        update_user_password: "api/wyc/api/update_user_password",//获取个人信息
        set_device_params: "api/wyc/api/set_device_params",
        get_device_statistics: "api/wyc/api/get_device_statistics",//获取桩状态
        get_settlement_list: "api/wyc/api/get_settlement_list",//结算列表
        update_settlement_fine: "api/wyc/api/update_settlement_fine",//结算处理
        download_device_turnover_info: "api/wyc/api/download_device_turnover_info",//下载结算详情
    };
    public powerfun = function (params) {
        var apis = localStorage.getItem('powerapi');
        return apis.indexOf(params) >= 0;
    };
    public powercontroll = {
        read: 'R',
        update: 'U',
        delete: 'D',
    };
    public GCJ02ToBD09 = function (lat, lon) {
        var x = lon, y = lat;
        var x_pi = x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        var tempLon = (z * Math.cos(theta) + 0.0065).toFixed(6);
        var tempLat = (z * Math.sin(theta) + 0.006).toFixed(6);
        var gps = {lat: tempLat, lon: tempLon};
        return gps;
    };
    public BD09ToGCJ02 = function (lat, lon) {
        var x = lon - 0.0065, y = lat - 0.006;
        var x_pi = x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        var tempLon = (z * Math.cos(theta)).toFixed(6);
        var tempLat = (z * Math.sin(theta)).toFixed(6);
        var gps = {lat: tempLat, lon: tempLon};
        return gps;
    };
    public navModel = [
        {
            "show": true,
            "title": "home",
            "hasSubmenu": false,
            "name": "首页",
            "href": "home",
            "icon": "dashboard"
        },
        {
            "show": true,
            "title": "account",
            "hasSubmenu": true,
            "name": "账户管理",
            "icon": "account",
            "submenu": [{
                "show": true,
                "name": "子账户管理",
                "href": "childAccountList"
            }, {
                "show": false,
                "name": "添加子账户",
                "href": "childAccountAdd"
            }, {
                "show": false,
                "name": "编辑子账户",
                "href": "childAccountEdit"
            }, {
                "show": false,
                "name": "查看子账户",
                "href": "childAccountDetail"
            }, {
                "show": false,
                "name": "添加子账户",
                "href": "childAccountOtherAdd"
            }, {
                "show": false,
                "name": "编辑子账户",
                "href": "childAccountOtherEdit"
            }, {
                "show": false,
                "name": "子账户列表",
                "href": "allChildAccountList"
            }, {
                "show": false,
                "name": "编辑子账户",
                "href": "allChildAccountEdit"
            }, {
                "show": false,
                "name": "查看子账户详情",
                "href": "allChildAccountDetail"
            }, {
                "show": true,
                "name": "代理商管理",
                "href": "agentAccountList"
            }, {
                "show": false,
                "name": "添加代理商",
                "href": "agentAccountAdd"
            }, {
                "show": false,
                "name": "编辑代理商",
                "href": "agentAccountEdit"
            }, {
                "show": false,
                "name": "查看代理商详情",
                "href": "agentAccountDetail"
            }, {
                "show": true,
                "name": "城市合伙人管理",
                "href": "citypartnerList"
            }, {
                "show": false,
                "name": "添加城市合伙人",
                "href": "citypartnerAdd"
            }, {
                "show": false,
                "name": "查看城市合伙人详情",
                "href": "citypartnerDetail"
            }, {
                "show": false,
                "name": "编辑城市合伙人",
                "href": "citypartnerEdit"
            }, {
                "show": true,
                "name": "商户管理",
                "href": "merchantList"
            }, {
                "show": false,
                "name": "新增商户",
                "href": "merchantAdd"
            }, {
                "show": false,
                "name": "编辑商户",
                "href": "merchantEdit"
            }, {
                "show": false,
                "name": "查看商户信息",
                "href": "merchantDetail"
            }]
        },
        {
            "show": true,
            "title": "commodity",
            "hasSubmenu": true,
            "name": "商品管理",
            "icon": "commodity",
            "submenu": [{
                "show": true,
                "name": "商品一览",
                "href": "commodityList"
            }, {
                "show": false,
                "name": "新增商品",
                "href": "commodityAdd"
            }, {
                "show": false,
                "name": "商品查看",
                "href": "commodityDetail"
            }, {
                "show": false,
                "name": "商品编辑",
                "href": "commodityEdit"
            }]
        },
        {
            "show": true,
            "title": "equipment",
            "hasSubmenu": true,
            "name": "设备管理",
            "icon": "equipment",
            "submenu": [{
                "show": true,
                "name": "设备一览",
                "href": "equipmentList"
            }, {
                "show": false,
                "name": "查看桩详情",
                "href": "equipmentDetail"
            }, {
                "show": true,
                "name": "未绑设备一览",
                "href": "equipmentUnbind"
            }, {
                "show": true,
                "name": "手动编号录入",
                "href": "equipmentAdd"
            }, {
                "show": true,
                "name": "批量编号导入",
                "href": "equipmentImport"
            }, {
                "show": true,
                "name": "批量设置",
                "href": "equipmentBatchSet"
            }, {
                "show": true,
                "name": "上下线记录",
                "href": "equipmentOnOffRecord"
            }, {
                "show": false,
                "name": "设备初始化",
                "href": "equipmentInitAdd"
            }, {
                "show": false,
                "name": "设备初始化编辑",
                "href": "equipmentInitEdit"
            }, {
                "show": false,
                "name": "充电桩参数配置",
                "href": "evseConfig"
            }, {
                "show": false,
                "name": "充值机参数配置",
                "href": "evseCardConfig"
            }]
        },
        {
            "show": true,
            "title": "order",
            "hasSubmenu": true,
            "name": "订单管理",
            "icon": "order",
            "submenu": [{
                "show": true,
                "name": "订单一览",
                "href": "orderSearchList"
            }, {
                "show": true,
                "name": "退款记录",
                "href": "refundRecordList"
            }]
        },
        {
            "show": true,
            "title": "rechargeCard",
            "hasSubmenu": true,
            "name": "充值卡管理",
            "icon": "rechargeCard",
            "submenu": [{
                "show": true,
                "name": "充卡记录",
                "href": "rechargeCardRecord"
            }]
        },
        {
            "show": true,
            "title": "finance",
            "hasSubmenu": true,
            "name": "财务管理",
            "icon": "finance",
            "submenu": [{
                "show": true,
                "name": "财务一览",
                "href": "financeList"
            }, {
                "show": false,
                "name": "申请提现",
                "href": "cashWithdrawal"
            }, {
                "show": false,
                "name": "收款配置",
                "href": "payConfigList"
            }, {
                "show": false,
                "name": "支付宝配置",
                "href": "alipayConfAdd"
            }, {
                "show": false,
                "name": "支付宝配置编辑",
                "href": "alipayConfEdit"
            }, {
                "show": false,
                "name": "微信公众号设置",
                "href": "wxPubConfAdd"
            }, {
                "show": false,
                "name": "微信公众号设置编辑",
                "href": "wxPubConfEdit"
            }, {
                "show": false,
                "name": "微信零钱包设置",
                "href": "wxWalletList"
            }, {
                "show": true,
                "name": "电费结算",
                "href": "settlement"
            }]
        },
        {
            "show": true,
            "title": "advertisement",
            "hasSubmenu": true,
            "name": "广告管理",
            "icon": "advertisement",
            "submenu": [{
                "show": true,
                "name": "广告一览",
                "href": "advertisementList"
            }, {
                "show": false,
                "name": "新增广告",
                "href": "advertisementAdd"
            }, {
                "show": false,
                "name": "编辑广告",
                "href": "advertisementEdit"
            }, {
                "show": false,
                "name": "查看广告",
                "href": "advertisementDetail"
            }]
        },
        {
            "show": true,
            "title": "appManagement",
            "hasSubmenu": true,
            "name": "APP管理",
            "icon": "appManagement",
            "submenu": [{
                "show": true,
                "name": "用户一览",
                "href": "appUserList"
            }, {
                "show": true,
                "name": "APP用户增速",
                "href": "appUserIncrease"
            }, {
                "show": false,
                "name": "APP用户查看",
                "href": "appUserDetail"
            }, {
                "show": true,
                "name": "消息推送",
                "href": "appMessagePush"
            }, {
                "show": true,
                "name": "资讯管理",
                "href": "appInformationList"
            }, {
                "show": false,
                "name": "新增资讯",
                "href": "appInformationAdd"
            }, {
                "show": false,
                "name": "编辑资讯",
                "href": "appInformationEdit"
            }, {
                "show": false,
                "name": "查看资讯",
                "href": "appInformationDetail"
            }, {
                "show": true,
                "name": "收支明细",
                "href": "appChargeRecord"
            }]
        },
        {
            "show": true,
            "title": "operationManagement",
            "hasSubmenu": true,
            "name": "运维管理",
            "icon": "operation",
            "submenu": [{
                "show": true,
                "name": "运维管理",
                "href": "operationManagementList"
            }, {
                "show": false,
                "name": "运维人员配置",
                "href": "maintenanceMan"
            }]
        },
        {
            "show": true,
            "title": "operationAnalysis",
            "hasSubmenu": true,
            "name": "运营分析",
            "icon": "operationAnalysis",
            "submenu": [{
                "show": true,
                "name": "财务统计报表",
                "href": "financialStatistics"
            }, {
                "show": true,
                "name": "机构统计报表",
                "href": "organizationStatistics"
            }]
        },
        {
            "show": true,
            "title": "complained",
            "hasSubmenu": true,
            "name": "申诉管理",
            "icon": "complained",
            "submenu": [{
                "show": true,
                "name": "申诉",
                "href": "complainedList"
            }, {
                "show": false,
                "name": "添加申诉",
                "href": "complainedAdd"
            }, {
                "show": false,
                "name": "查看申诉",
                "href": "complainedDetail"
            }]
        },
        {
            "show": true,
            "title": "charge",
            "hasSubmenu": true,
            "name": "充电监控",
            "icon": "charge",
            "submenu": [{
                "show": true,
                "name": "充电桩分布",
                "href": "chargeStationMap"
            }, {
                "show": false,
                "name": "充电桩状态",
                "href": "chargeStatus"
            }]
        },
        {
            "show": false,
            "title": "user",
            "hasSubmenu": true,
            "name": "系统用户管理",
            "icon": "user",
            "submenu": [{
                "show": false,
                "name": "修改用户",
                "href": "userEdit"
            }, {
                "show": false,
                "name": "修改密码",
                "href": "userPwdEdit"
            }, {
                "show": false,
                "name": "用户详情",
                "href": "userInfo"
            }]
        },
        {
            "show": true,
            "title": "setting",
            "hasSubmenu": true,
            "name": "系统设置",
            "icon": "setting",
            "submenu": [{
                "show": true,
                "name": "系统设置",
                "href": "settingEdit"
            }, {
                "show": true,
                "name": "用户协议",
                "href": "userAgreement"
            }]
        }
    ]
}