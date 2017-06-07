/**
 * Created by max on 2017/4/27.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {pagesRoutes} from './pages.routes';
import {CommonModule}  from '@angular/common';

import {PagesComponent} from './pages.component';
import {HomeComponent} from "./home/home.component";
import {UcPageTopComponent} from "../layout";
import {UcMenuComponent} from "../layout";


@NgModule({
    imports: [
        RouterModule.forChild(pagesRoutes),
        CommonModule,
    ],
    exports: [],
    declarations: [
        PagesComponent,
        HomeComponent,
        UcMenuComponent,
        UcPageTopComponent,
    ],
    providers: [],
})
export class PagesModule {
}

