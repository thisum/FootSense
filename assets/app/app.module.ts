import {NgModule, NgModuleMetadataType} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent }   from './app.component';
import {routing, appRoutingProviders}        from './app.routing';

import { PatientInfoComponent }   from './dashboard/patientinfo.component';

import {AuthService} from "./services/auth.service";
import {SignInComponent} from "./auth/signin.component";
import {SignUpComponent} from "./auth/signup.component";
import {PageNotFoundComponent} from "./error/page-not-found.component";
import {HttpModule} from "@angular/http";
import {PatientInfoService} from "./services/request.service";

@NgModule(<NgModuleMetadataType>{
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        MyDatePickerModule
    ],
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        PatientInfoComponent,
        PageNotFoundComponent
    ],
    providers: [
        AuthService,
        PatientInfoService,
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}