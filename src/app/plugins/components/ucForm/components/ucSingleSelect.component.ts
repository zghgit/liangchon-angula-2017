/**
 * Created by max on 2017/6/22.
 */
/**
 * Created by max on 2017/5/26.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'uc-single-select',
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
        <div>
           <input type="hidden" [formControlName]="model.key" [(ngModel)]="model.value">
        </div>
        <div class="select-container">
            <uc-select [model]="model" [options]="model.options" (geoChange)="afresh($event)" [error]="flag&&model.require"></uc-select>
        </div>
    </div>
`,
    styleUrls: ["../styles/ucSingleSelect.scss"]
})
export class UcSingleSelectComponent implements OnInit {
    @Input() model: any;
    @Input() form;
    public flag: boolean = false;//点击后才进行验证

    constructor() {
    }
    ngOnInit() {
    }
    //点击选择后进行省/市/区内容重置
    public afresh = (event) => {
        this.flag = true;
        this.model.value = event.value;
    }
}