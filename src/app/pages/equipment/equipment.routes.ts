/**
 * Created by max on 2017/5/9.
 */
import {Routes} from '@angular/router';
import {EquipmentComponent} from './equipment.component';
import {
    ChargingPileConfigComponent,
    EquipmentListComponent,
    EquipmentDetailComponent,
    EquipmentUnbindComponent,
    EquipmentOnOffComponent,
} from "./components/";


export const routes: Routes = [
    {
        path: "",
        component: EquipmentComponent,
        children: [
            {path: "", redirectTo:"equipmentList",pathMatch:"full"},
            {path: "equipmentList", component: EquipmentListComponent},
            {path: "equipmentDetail/:id", component: EquipmentDetailComponent},
            {path: "chargingPileConfig", component: ChargingPileConfigComponent},
            {path: "equipmentUnbind", component: EquipmentUnbindComponent},
            {path: "equipmentOnOffRecord", component: EquipmentOnOffComponent},
        ]
    },
];

