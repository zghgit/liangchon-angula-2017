/**
 * Created by max on 2017/6/14.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'advertisement-detail',
    templateUrl: '../views/advertisementDetail.html'
})
export class AdvertisementDetailComponent implements OnInit {
    public advertisement_id:string;
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
        let params = this.activatedRoute.params;
        params.subscribe(res=>{
            this.advertisement_id = res.id;
        })
        if (this.uc.powerfun(this.uc.constant.add_city_partner_user)) {
            this.plugins.button = {
                class: 'btn-danger',
                content: '广告点击次数清零',
                click: () => {
                    this.appHttpService.postData(this.uc.api.qc+'/update_advertisement_to_zero/hash/'+this.advertisement_id).subscribe(
                        res=>{
                            if (res.status){
                                location.reload();
                            }else {
                                swal({
                                    title: "广告次数清零失败!",
                                    text: res.error_msg,
                                    type: "error"
                                });
                            }
                        }
                    )
                }
            };
        }

        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_advertisement/hash/", {
                params: {
                    advertisement_id: params['id']
                }
            }));
        data.subscribe((res) => {
            let basesrc=this.uc.api.qc+"/get_file/hash/";
            if (res.status) {
                let _data = res.data;
                let show_position;
                switch (_data.show_position) {
                    case '1':
                        show_position = '启动画面';
                        break;
                    case '2':
                        show_position = '结算页面';
                        break;
                    case '3':
                        show_position = '首页banner';
                        break;
                    case '4':
                        show_position = '引导页面';
                        break;
                    default:
                        show_position = '未指定';
                        break;
                }
                let advertisement_range_items = _data.advertisement_range;
                let advertisement_range = '';
                if (!advertisement_range_items[0].province_name) {
                    advertisement_range = '全部区域'
                } else {
                    for (let i = 0; i < advertisement_range_items.length; i++) {
                        let range = '';
                        if (advertisement_range_items[i].province_name) {
                            range += advertisement_range_items[i].province_name;
                        }
                        if (advertisement_range_items[i].city_name) {
                            range += '-' + advertisement_range_items[i].city_name;
                        }
                        if (advertisement_range_items[i].district_name) {
                            range += '-' + advertisement_range_items[i].district_name;
                        }
                        advertisement_range += range + ';';
                    }
                }
                this.plugins.table.data = [
                    {
                        type: 'text',
                        label: '广告名称',
                        content: _data.advertisement_name
                    }, {
                        type: 'img',
                        label: '广告图片',
                        src: basesrc+_data.advertisement_url
                    }, {
                        type: 'text',
                        label: '链接地址',
                        content: _data.link_url
                    }, {
                        type: 'text',
                        label: '投放区域',
                        content: advertisement_range
                    }, {
                        type: 'text',
                        label: '显示位置',
                        content: show_position
                    }, {
                        type: 'text',
                        label: '显示时长',
                        content: _data.show_duration
                    }, {
                        type: 'text',
                        label: '启用状态',
                        content: _data.status == 1 ? '启用' : '禁用'
                    }, {
                        type: 'text',
                        label: '是否为默认广告',
                        content: _data.default_display == 1 ? '是' : '否'
                    }, {
                        type: 'text',
                        label: '点击次数',
                        content: _data.click_times
                    }
                ];
            } else {
                swal({
                    title: "获取商户信息失败!",
                    text: res.error_msg,
                    type: "error"
                });
            }
        })
    }

}