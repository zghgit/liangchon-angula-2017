/**
 * Created by max on 2017/5/9.
 */
import {NgModule} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule} from "@angular/router";
import {routes} from "./equipment.routes";
import {FormsModule} from '@angular/forms';

import {UcFormModule} from "../../plugins/UcFormModule";



import {EquipmentComponent} from './equipment.component';
import {
    EquipmentListComponent,
    EquipmentDetailComponent,
    EquipmentUnbindComponent,
    EquipmentOnOffComponent,
    EquipmentInitAddComponent,
    EquipmentInitEditComponent,
    EquipmentAddComponent,
    EquipmentImportComponent,
    EquipmentBatchSetComponent,
    EquipmentConfigComponent,
} from "./components";


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        UcFormModule,
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        EquipmentComponent,
        EquipmentListComponent,
        EquipmentDetailComponent,
        EquipmentUnbindComponent,
        EquipmentOnOffComponent,
        EquipmentInitAddComponent,
        EquipmentInitEditComponent,
        EquipmentAddComponent,
        EquipmentImportComponent,
        EquipmentBatchSetComponent,
        EquipmentConfigComponent,
    ],
    providers: [],
})
export class EquipmentModule {
}
