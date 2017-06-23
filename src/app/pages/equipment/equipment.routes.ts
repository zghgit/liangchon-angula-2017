/**
 * Created by max on 2017/5/9.
 */
import {Routes} from '@angular/router';
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
} from "./components/";


export const routes: Routes = [
    {
        path: "",
        component: EquipmentComponent,
        children: [
            {path: "", redirectTo: "equipmentList", pathMatch: "full"},
            {path: "equipmentList", component: EquipmentListComponent},
            {path: "equipmentDetail/:id", component: EquipmentDetailComponent},
            {path: "equipmentUnbind", component: EquipmentUnbindComponent},
            {path: "equipmentOnOffRecord", component: EquipmentOnOffComponent},
            {path: "equipmentInitAdd", component: EquipmentInitAddComponent},
            {path: "equipmentInitAdd/:id", component: EquipmentInitAddComponent},
            {path: "equipmentAdd", component: EquipmentAddComponent},
            {path: "equipmentInitEdit/:id", component: EquipmentInitEditComponent},
            {path: "equipmentImport", component: EquipmentImportComponent},
            {path: "equipmentBatchSet", component: EquipmentBatchSetComponent},
            {path: "equipmentConfig/:id", component: EquipmentConfigComponent},
        ]
    },
];

