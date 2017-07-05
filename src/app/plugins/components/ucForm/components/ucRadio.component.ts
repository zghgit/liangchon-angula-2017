/**
 * Created by max on 2017/5/16.
 */
import {Component, OnInit, Input} from '@angular/core';
@Component({
    selector: 'uc-radio',
    template: `
<div [formGroup]="form">
    <div *ngIf="model.label" class="item-title">
        <label>{{model.label}}
            <span *ngIf="model.require">*</span>
            <ng-container *ngFor="let item of model.errormsg">
                <i *ngIf="form.get(model.key).hasError(item.type)&&flag">{{item.content}}</i>
            </ng-container>
        </label>
    </div>
    <div class="item-content">
        <ng-container *ngFor="let item of model.options">
            <label><input type="radio" [(ngModel)]="model.value" [formControlName]="model.key" [value]="item.value" (click)="model.click?model.click(item.value):0" (change)="hasChanged(model.value)"><span>{{item.content}}</span></label>
        </ng-container>
    </div>
</div>
`,
    styleUrls: ["../styles/ucRadio.scss"]
})
export class UcRadioComponent implements OnInit {
    @Input() model: any;
    @Input() form;
    public flag: boolean = false;

    constructor() {
    }

    ngOnInit() {
        // this.form.get(this.model.key).valueChanges.subscribe(data => {
        //     console.log(data)
        // });
    }

    public hasChanged(data) {
        this.flag = true;
    }
}