/**
 * Created by max on 2017/5/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {routes} from "./equipment.routes";
import {UcFormModule} from "../../plugins/UcFormModule";



import {EquipmentComponent} from './equipment.component';
import {
    ChargingPileConfigComponent,
    EquipmentListComponent,
    EquipmentDetailComponent,
    EquipmentUnbindComponent,
    EquipmentOnOffComponent,
} from "./components";


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        UcFormModule
    ],
    exports: [],
    declarations: [
        EquipmentComponent,
        ChargingPileConfigComponent,
        EquipmentListComponent,
        EquipmentDetailComponent,
        EquipmentUnbindComponent,
        EquipmentOnOffComponent,
    ],
    providers: [],
})
export class EquipmentModule {
}
