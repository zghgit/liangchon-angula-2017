/**
 * Created by max on 2017/6/7.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'uc-input-add',
    template: `
<div [formGroup]="form">
    <div *ngIf="model.label" class="item-title">
        <label>{{model.label}}
            <span *ngIf="model.require">*</span>
            <ng-container *ngFor="let item of model.errormsg">
                <i *ngIf="form.get(model.key).hasError(item.type)&&form.get(model.key).touched">{{item.content}}</i>
            </ng-container>
            <i>{{errorMsg}}</i>
        </label>
    </div>
    <div>
        <input class="form-control" type="hidden" [(ngModel)]="model.value" [formControlName]="model.key"/>
    </div>
</div>
<div class="item-content">
    <input class="form-control" type="text" placeholder="{{model.placeholder}}" [(ngModel)]="some" (input)="onKey(some)" [ngClass]="{'has-error': error}">
    <button class="btn btn-success" [disabled]="canConfirm" (click)="confirmValue(some)">{{model.content}}</button>
</div>
<div *ngIf="showData()" class="showData">
    <span>已经添加:</span>
    <div>
        <div *ngFor="let item of inputSet">
            <span>{{item}}</span>
            <i (click)="delSet(item)"><img src="/assets/images/remove.png" alt=""></i>
        </div>
    </div>
</div>
`,
    styleUrls:["../styles/ucInputAdd.scss"]
})
export class UcInputAddComponent implements OnInit {
    @Input() model: any;
    @Input() form;
    public reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[0-9])\d{8}$)|^[400|800]\d{7,9}$/;
    public canConfirm:boolean = true;
    public error:boolean=false;
    public errorMsg:string = "";
    public inputSet = new Set();
    public some="";
    constructor() {
    }

    ngOnInit() {
        console.log(this.model);
        console.log(this.reg)
    }
    public onKey(data){
        console.log(data)
        if(this.reg.test(data)){
            this.error = false;
            this.canConfirm = false;
            this.errorMsg ="";
        }else {
            this.error = true;
            this.canConfirm = true;
            this.errorMsg ="请输入正确的联系电话";
        }
    }
    public confirmValue(data){
        if (data==""){
            this.error = true;
            this.errorMsg ="不能为空";
        }else if (this.inputSet.has(data)){
            this.error = true;
            this.errorMsg ="联系电话已重复";

        }else {
            this.error = false;
            this.inputSet.add(data);
            this.errorMsg ="";
            this.some = "";
        }
        this.uploadValue(this.inputSet)
    }
    public delSet(data){
        this.inputSet.delete(data);
        this.uploadValue(this.inputSet)
    }
    public showData(){
        if (this.inputSet.size == 0){
            return false
        }
        return true
    }
    public uploadValue(model) {
        if (model.size == 0) {
            this.model.value = "";
        } else {
            this.model.value = JSON.stringify(Array.from(model))
        }
    }

}