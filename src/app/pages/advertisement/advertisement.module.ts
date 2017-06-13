/**
 * Created by max on 2017/6/13.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule}  from '@angular/common';
import {UcFormModule} from "../../plugins/UcFormModule";

import {AdvertisementRoutes} from "./advertisement.routes";
import { AdvertisementComponent } from "./advertisement.component";

import {
    AdvertisementListComponent,
    advertisementAddComponent,
} from "./components";


@NgModule({
    imports: [
        CommonModule,
        UcFormModule,
        RouterModule.forChild(AdvertisementRoutes)
    ],
    exports: [],
    declarations: [
        AdvertisementComponent,
        AdvertisementListComponent,
        advertisementAddComponent,
    ],
    providers: [],
})
export class AdvertisementModule {
}
