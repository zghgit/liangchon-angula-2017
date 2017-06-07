/**
 * Created by max on 2017/5/10.
 */

import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'uc-button',
    template:`<button class="btn" (click)="model.click?model.click():0" ngClass="{{model?.class}}" [disabled]="model?.disable">{{model?.content}}</button>`,
    styleUrls:["../styles/ucButton.scss"]
})
export class UcButtonComponent implements OnInit {
    @Input() model:any;
    constructor() { }
    ngOnInit() {
    }

}