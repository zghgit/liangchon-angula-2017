/**
 * Created by max on 2017/5/18.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'uc-input-text',
    template: `
<div [formGroup]="form">
    <div *ngIf="model.label" class="item-title">
        <label>{{model.label}}
            <span *ngIf="model.require">*</span>
            <ng-container *ngFor="let item of model.errormsg">
                <i *ngIf="form.get(model.key).hasError(item.type)&&form.get(model.key).touched">{{item.content}}</i>
            </ng-container>
            <button *ngIf="model.button" class="btn {{model.button.class}}" (click)="model.button.click(form)">{{model.button.content}}</button>
        </label>
    </div>
    <ng-container [ngSwitch]="model.inputType">
        <ng-container *ngSwitchCase="'text'">
            <input class="form-control" [ngClass]="{'has-error':form.get(model.key).invalid&&form.get(model.key).touched}" type="text" [(ngModel)]="model.value"  [formControlName]="model.key" placeholder="{{model.placeholder}}"/>
        </ng-container>
        <ng-container *ngSwitchCase="'oldpassword'">
            <input class="form-control" [ngClass]="{'has-error':form.get(model.key).invalid&&form.get(model.key).touched}" type="password" [(ngModel)]="model.value" [formControlName]="model.key" placeholder="{{model.placeholder}}" />
        </ng-container>
        <ng-container *ngSwitchCase="'password'">
            <input class="form-control" validateEqual="repassword" [ngClass]="{'has-error':form.get(model.key).invalid&&form.get(model.key).touched}" type="password" [(ngModel)]="model.value" [formControlName]="model.key" placeholder="{{model.placeholder}}" />
        </ng-container>
        <ng-container *ngSwitchCase="'repassword'">
            <input class="form-control" validateEqual="password" [ngClass]="{'has-error':form.get(model.key).invalid&&form.get(model.key).touched}" type="password" [(ngModel)]="model.value" [formControlName]="model.key" placeholder="{{model.placeholder}}" />
        </ng-container>
        <ng-container *ngSwitchCase="'textarea'">
            <textarea [ngClass]="{'has-error':form.get(model.key).invalid&&form.get(model.key).touched}" [(ngModel)]="model.value" rows="{{model.rows|| 5 }}" class="form-control" [formControlName]="model.key" placeholder="{{model.placeholder}}"></textarea>
        </ng-container>
        <ng-container *ngSwitchDefault>
            <input class="form-control" [ngClass]="{'has-error':form.get(model.key).invalid&&form.get(model.key).touched}" type="text" [(ngModel)]="model.value" [formControlName]="model.key" placeholder="{{model.placeholder}}" />
        </ng-container>
    </ng-container>
</div>
`,
    styleUrls:["../styles/ucInput.scss"]
})
export class UcInputComponent implements OnInit {
    @Input() model: any;
    @Input() form;
    constructor() {
    }

    ngOnInit() {
    }

}