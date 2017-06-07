/**
 * Created by max on 2017/5/9.
 */

import {NgModule} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule} from "@angular/router";
import {UcFormModule} from "../../plugins/UcFormModule";

import {ComplainComponent} from './complained.component';
import {ComplainRoutes} from "./complained.routes";
import {
    complainedAddComponent,
    complainedDetailComponent,
    complainedListComponent
} from './components';

@NgModule({
    imports: [
        RouterModule.forChild(ComplainRoutes),
        UcFormModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        ComplainComponent,
        complainedAddComponent,
        complainedDetailComponent,
        complainedListComponent
    ],
    providers: [],
})
export class ComplainedModule {
}
