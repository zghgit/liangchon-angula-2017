/**
 * Created by max on 2017/6/19.
 */
import {Routes} from "@angular/router";

import {ChargeStationComponent} from "./chargeStation.component";

import {
    ChargeStationMapComponent,
    ChargeStatusComponent
} from "./components"

export const chargeStationRoutes:Routes =[
    {
        path:"",
        component:ChargeStationComponent,
        children:[
            {path:"",redirectTo:"chargeStationMap",pathMatch:"full"},
            {path:"chargeStationMap",component:ChargeStationMapComponent},
            {path:"chargeStatus/:id",component:ChargeStatusComponent},
        ]
    }
]