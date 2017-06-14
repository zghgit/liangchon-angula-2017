/**
 * Created by max on 2017/6/13.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule}  from '@angular/common';
import {UcFormModule} from "../../plugins/UcFormModule";
import {CustomFormsModule} from "ng2-validation";

import {AdvertisementRoutes} from "./advertisement.routes";
import { AdvertisementComponent } from "./advertisement.component";

import {
    AdvertisementListComponent,
    advertisementAddComponent,
    AdvertisementDetailComponent,
    AdvertisementEditComponent,
} from "./components";


@NgModule({
    imports: [
        CommonModule,
        CustomFormsModule,
        UcFormModule,
        RouterModule.forChild(AdvertisementRoutes)
    ],
    exports: [],
    declarations: [
        AdvertisementComponent,
        AdvertisementListComponent,
        advertisementAddComponent,
        AdvertisementDetailComponent,
        AdvertisementEditComponent,
    ],
    providers: [],
})
export class AdvertisementModule {
}
