/**
 * Created by max on 2017/5/9.
 */

import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {UcFormModule} from "../../plugins/UcFormModule";

import {rechargeCardComponent} from './rechargeCard.component';
import {rechargeCardRoutes} from "./rechargeCard.routes";
import {
    rechargeCardRecordListComponent,
} from './components';

@NgModule({
    imports: [
        RouterModule.forChild(rechargeCardRoutes),
        UcFormModule
    ],
    exports: [],
    declarations: [
        rechargeCardComponent,
        rechargeCardRecordListComponent
    ],
    providers: [],
})
export class rechargeCardModule {
}
