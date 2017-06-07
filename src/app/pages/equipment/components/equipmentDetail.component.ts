/**
 * Created by max on 2017/5/9.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'equipment-detail',
    templateUrl: '../views/equipmentDetail.html'
})
export class EquipmentDetailComponent implements OnInit {
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
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_device/hash", {params: {device_id: params['id']}}));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                let areas = '';
                if (_data.province_code_name) {
                    areas += _data.province_code_name;
                }
                if (_data.city_code_name) {
                    areas += '-' + _data.city_code_name;
                }
                if (_data.district_code_name) {
                    areas += '-' + _data.district_code_name;
                }
                this.plugins.table.data = [
                    {
                        type: 'text',
                        label: '地区',
                        content: areas
                    },
                    {
                        type: 'text',
                        label: '设备编号',
                        content: _data.device_no
                    },
                    {
                        type: 'text',
                        label: '设备名称',
                        content: _data.device_name
                    },
                    {
                        type: 'text',
                        label: '设备类型',
                        content: _data.device_type_name
                    },
                    {
                        type: 'text',
                        label: '启用状态',
                        content: _data.status == 1 ? '启用' : '禁用'
                    },
                    {
                        type: 'text',
                        label: '在线状态',
                        content: _data.net_status_name
                    },
                    {
                        type: 'text',
                        label: '通讯方式',
                        content: _data.communicate_type_name
                    },
                    {
                        type: 'text',
                        label: '固件版本',
                        content: _data.soft_ver
                    },
                    {
                        type: 'text',
                        label: '设备详细地址',
                        content: _data.device_address
                    },
                    {
                        type: 'text',
                        label: '设备所在小区名称',
                        content: _data.areas_name
                    }
                ];
                if (_data.device_type == 1) {
                    let data = this.appHttpService.postData(this.uc.api.qc + "/get_commodity_list/hash/", {
                        params: {
                            page_now: 1,
                            limit: 500,
                            sort_by: 'create_time',
                            sort_type: '',
                            search_by: {}
                        }
                    })
                    data.subscribe(
                        res => {
                            if (res.status) {
                                let commoditys = [];
                                let list = res.data.list;
                                for (let i = 0; i < list.length; i++) {
                                    for (let j = 0; j < _data.commodity_info.length; j++) {
                                        if (list[i].commodity_id == _data.commodity_info[j].commodity_id) {
                                            commoditys.push(list[i].commodity_name);
                                        }
                                    }
                                }
                                this.plugins.table.data.push({
                                    type: 'text',
                                    label: '商品',
                                    content: commoditys.join(',')
                                })
                            }
                        })
                }
            } else {
                swal({
                    title: "获取桩详情失败!",
                    text: res.error_msg,
                    type: "error"
                });
            }
        })
    }

}