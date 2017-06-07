/**
 * Created by max on 2017/4/19.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule}  from '@angular/common';
import {UcFormModule} from "../../plugins/UcFormModule";

import {AccountRoutes} from "./account.routes";
import {AccountComponent} from "./account.component";

import {
    AgentListComponent,
    ChildAccountListComponent,
    CitypartnerListComponent,
    CitypartnerDetailComponent,
    CitypartnerAddComponent,
    CitypartnerEditComponent,
    MerchantListComponent,
    merchantDetailComponent,
    MerchantAddComponent,
    MerchantEditComponent,
} from "./components";


@NgModule({
    imports: [
        CommonModule,
        UcFormModule,
        RouterModule.forChild(AccountRoutes)
    ],
    exports: [],
    declarations: [
        AccountComponent,
        AgentListComponent,
        ChildAccountListComponent,
        CitypartnerListComponent,
        CitypartnerDetailComponent,
        CitypartnerAddComponent,
        CitypartnerEditComponent,
        MerchantListComponent,
        merchantDetailComponent,
        MerchantAddComponent,
        MerchantEditComponent,
    ],
    providers: [],
})
export class AccountModule {
}
