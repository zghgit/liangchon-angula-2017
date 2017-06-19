/**
 * Created by max on 2017/6/19.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule}  from '@angular/common';
import {chargeStationRoutes} from "./chargeStation.routes";
import {ChargeStationComponent} from './chargeStation.component';
import {UcFormModule} from "../../plugins/UcFormModule";

import {
    ChargeStationMapComponent,
    ChargeStatusComponent,
} from "./components";

@NgModule({
    imports: [
        RouterModule.forChild(chargeStationRoutes),
        CommonModule,
        UcFormModule
    ],
    exports: [],
    declarations: [
        ChargeStationComponent,
        ChargeStationMapComponent,
        ChargeStatusComponent
    ],
    providers: [],
})
export class ChargeStationModule {
}
