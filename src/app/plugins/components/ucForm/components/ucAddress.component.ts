/**
 * Created by max on 2017/5/26.
 */
import {Component, OnInit, Input} from '@angular/core';
declare var swal: any;

@Component({
    selector: 'uc-address',
    template: `
    <div [formGroup]="form">
        <div *ngIf="model.label" class="item-title">
            <label>{{model.label}}
                <span *ngIf="model.require">*</span>
                <ng-container *ngFor="let item of model.errormsg">
                    <i *ngIf="form.get(model.key).invalid&&flag">{{item.content}}</i>
                </ng-container>
            </label>
        </div>
        <div [formGroupName]="model.key">
            <input type="hidden" [formControlName]="model.config.province.name" [(ngModel)]="model.config.province.value">
            <input type="hidden" [formControlName]="model.config.city.name" [(ngModel)]="model.config.city.value">
            <input type="hidden" [formControlName]="model.config.area.name" [(ngModel)]="model.config.area.value">
        </div>
        <div class="select-container">
            <uc-select [model]="model.config.province" [options]="provinceOptions" (geoChange)="afresh($event)" [error]="flag&&model.require"></uc-select>
            <uc-select [model]="model.config.city" [options]="cityOptions" (geoChange)="afresh($event)" [error]="flag&&model.require"></uc-select>
            <uc-select [model]="model.config.area" [options]="areaOptions" (geoChange)="afresh($event)" [error]="flag&&model.require"></uc-select>
        </div>
    </div>
`,
    styleUrls: ["../styles/ucAddress.scss"]
})
export class UcAddressComponent implements OnInit {
    @Input() model: any;
    @Input() form;
    public provinceOptions: Array<any> = [];//省内容
    public cityOptions: Array<any> = [];//市内容
    public areaOptions: Array<any> = [];//地区内容
    public flag: boolean = false;//点击后才进行验证

    constructor() {
        // this.form.valueChanges.subscribe(data => {console.log(data)});
    }
    ngOnInit() {
        let province = this.model.config.province.value;
        let city = this.model.config.city.value;
        let area = this.model.config.area.value;
        //初始化
        this.ajax(1, 0);
        if (city && city != 0) {
            this.ajax(2, province);
        }
        if (area && area != 0) {
            this.ajax(3, city);
        }

    }
    //封装的ajax
    public ajax = (params, value?) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.model.url + params + '/' + value);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status == 200) {
                let responseText = JSON.parse(xhr.responseText);
                if (responseText.status) {
                    if (params == 1) {
                        this.provinceOptions = responseText.data;
                    } else if (params == 2) {
                        this.cityOptions = responseText.data;
                    } else {
                        this.areaOptions = responseText.data;
                    }
                } else {
                    swal({
                        title: "获取地址信息失败!",
                        text: responseText.error_msg,
                        type: "error"
                    });
                }

            }
        }
    }
    //点击选择后进行省/市/区内容重置
    public afresh = (event) => {
        this.flag = true;
        if (event.name == "province_code") {
            let params = 2;
            this.model.config.city.value = "0";
            this.model.config.area.value = "0";
            this.ajax(params, event.value);
        } else if (event.name == "city_code") {
            let params = 3;
            this.model.config.area.value = "0";
            this.ajax(params, event.value);
        } else if (event.name = "district_code") {

        }
    }
}