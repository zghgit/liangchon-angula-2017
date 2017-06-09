/**
 * Created by max on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule}  from '@angular/common';
import {UcFormModule} from "../../plugins/UcFormModule";

import {UserRoutes} from "./user.routes";
import {UserComponent} from "./user.component";

import {
    UserInfoComponent,
    UserEditComponent,
} from "./components";


@NgModule({
    imports: [
        CommonModule,
        UcFormModule,
        RouterModule.forChild(UserRoutes)
    ],
    exports: [],
    declarations: [
        UserComponent,
        UserInfoComponent,
        UserEditComponent,
    ],
    providers: [],
})
export class UserModule {
}
