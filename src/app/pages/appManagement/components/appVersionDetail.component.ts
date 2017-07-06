/**
 * Created by max on 2017/7/5.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'app-version-detail',
    templateUrl: '../views/appVersionDetail.html'
})
export class AppVersionDetailComponent implements OnInit {
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
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_version/", {
                params: {
                    ver_mgr_id: params['id']
                }
            }));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                this.plugins.table.data = [
                    {
                        type: 'text',
                        label: '版本号',
                        content: _data.ver_code
                    }, {
                        type: 'text',
                        label: '强制更新',
                        content: _data.force_update_name
                    }, {
                        type: 'text',
                        label: '手机类型',
                        content: _data.phone_type_name
                    }, {
                        type: 'text',
                        label: '版本链接',
                        content: _data.ver_link
                    }, {
                        type: 'text',
                        label: '版本描述',
                        content: _data.ver_description
                    }, {
                        type: 'text',
                        label: '发布时间',
                        content: _data.create_time
                    }
                ];
            } else {
                swal({
                    title: "获取用户信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }

}