/**
 * Created by max on 2017/6/13.
 */
/**
 * Created by max on 2017/6/7.
 */
import {Component, OnInit, Input} from '@angular/core';
declare var swal: any;
@Component({
    selector: 'uc-input-pacs',
    template: `
<div [formGroup]="form">
    <div *ngIf="model.label" class="item-title">
        <label>{{model.label}}
            <span *ngIf="model.require">*</span>
            <ng-container *ngFor="let item of model.errormsg">
                <i *ngIf="form.get(model.key).hasError(item.type)&&flag">{{item.content}}</i>
            </ng-container>
            <i>{{errorMsg}}</i>
        </label>
    </div>
    <div>
        <input class="form-control" type="hidden" [(ngModel)]="model.value" [formControlName]="model.key"/>
    </div>
</div>
<div class="select-all">
    <label><input type="checkbox" [checked]="model.check_all" (change)="isSelectedAll($event.target.checked)">全部地区</label>
</div>
<ng-container *ngIf="showSelect">
    <div class="item-content">
        <div class="select-container">
                <uc-select [model]="config.province" [options]="provinceOptions" (geoChange)="afresh($event)"></uc-select>
                <uc-select [model]="config.city" [options]="cityOptions" (geoChange)="afresh($event)"></uc-select>
                <uc-select [model]="config.area" [options]="areaOptions" (geoChange)="afresh($event)"></uc-select>
            </div>
        <button class="btn btn-success" [disabled]="canConfirm" (click)="confirmValue()">{{model.content}}</button>
    </div>
    <div *ngIf="showData()" class="showData">
        <span>已经添加:</span>
        <div>
            <div *ngFor="let item of backValue.selectedSet;index as i">
                <span>{{item.province_name}}-{{item.city_name}}-{{item.district_name}}</span>
                <i (click)="delSet(i)"><img src="/assets/images/remove.png" alt=""></i>
            </div>
        </div>
    </div>
</ng-container>
`,
    styleUrls: ["../styles/ucInputPacs.scss"]
})
export class UcInputPacsComponent implements OnInit {
    @Input() model: any;
    @Input() form;
    public canConfirm: boolean = true;//不可以添加
    public errorMsg: string = "";//验证提示
    public flag: boolean = false;

    public provinceOptions: Array<any> = [];//省内容
    public cityOptions: Array<any> = [];//市内容
    public areaOptions: Array<any> = [];//地区内容

    public showSelect:boolean;//显示地址选择
    public backValue:any={
        check_all:1,
        selectedSet:[],
    };

    public config: any = {
        province: {
            name: 'province_code',
            value: "0",
            placeholder: "--请选择省--",
        },
        city: {
            name: 'city_code',
            value: '0',
            placeholder: "--请选择市--",
        },
        area: {
            name: 'district_code',
            value: '0',
            placeholder: "--请选择区--",
        }
    };
    public tempSel = {
        province_code:"0",
        province_name:"",
        city_code:"0",
        city_name:"",
        district_code:"0",
        district_name:"",
    };

    constructor() {
    }

    ngOnInit() {
        this.showSelect = !this.model.check_all;
        this.backValue.check_all = this.showSelect?2:1;
        //初始化
        this.ajax(1, 0);
        if (this.model.options.length > 0) {
            for (let item of this.model.options) {
                this.backValue.selectedSet.push({
                    province_code:item.province_code,
                    province_name:item.province_name,
                    city_code:item.city_code,
                    city_name:item.city_name,
                    district_code:item.district_code,
                    district_name:item.district_name,
                })
            }
        }

        this.uploadValue();
    }
    public isSelectedAll(data){
        if(data){
            this.showSelect = false;
            this.backValue.check_all = 1;
        }else {
            this.showSelect = true;
            this.backValue.check_all = 2;
        }
        this.uploadValue();
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
    //点击添加内容
    public confirmValue() {
        for(let item of this.backValue.selectedSet){
            if(item.province_code==this.tempSel.province_code&&item.city_code==this.tempSel.city_code&&item.district_code==this.tempSel.district_code){
                this.errorMsg = "地址重复";
                return
            }
        }
        this.errorMsg = "";
        this.backValue.selectedSet.push(JSON.parse(JSON.stringify(this.tempSel)));
        this.uploadValue();
    }

    //删除集合项目
    public delSet(data) {
        this.backValue.selectedSet.splice(data,1)
        this.uploadValue();
    }

    //展示集合内容
    public showData() {
        if (this.backValue.selectedSet.length == 0) {
            return false
        }
        return true
    }

    //更新表单数据
    public uploadValue() {
        this.model.value = JSON.stringify(this.backValue)
    }
    //点击选择后进行省/市/区内容重置
    public afresh = (event) => {
        this.flag = true;
        if (event.name == "province_code") {
            let params = 2;
            this.config.city.value = "0";
            this.config.area.value = "0";
            this.errorMsg = "省市区都是必选的";
            this.ajax(params, event.value);
            this.tempSel.province_code=event.value;
            this.tempSel.province_name=event.content;
        } else if (event.name == "city_code") {
            let params = 3;
            this.config.area.value = "0";
            this.errorMsg = "省市区都是必选的";
            this.ajax(params, event.value);
            this.tempSel.city_code=event.value;
            this.tempSel.city_name=event.content;
        } else if (event.name = "district_code") {
            this.errorMsg = "";
            this.canConfirm = false;
            this.tempSel.district_code=event.value;
            this.tempSel.district_name=event.content;
        }
    }

}