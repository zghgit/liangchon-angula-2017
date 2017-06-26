import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import {AppComponent} from './app.component';
import { LoginComponent,RepasswordComponent } from "./index";
import {AppHttpService,DataService,UC,GlobalState} from "./plugins/globalservice";
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RepasswordComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes,{ useHash: true }),
    ],
    providers: [AppHttpService,DataService,UC,GlobalState],
    bootstrap: [AppComponent]
})
export class AppModule {
}
