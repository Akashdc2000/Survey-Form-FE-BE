import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {  SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';

@NgModule({
    declarations: [
        SurveyComponent
    ],
    imports: [
    BrowserModule,
    SurveyRoutingModule
    ],
    providers: [],
    bootstrap: [SurveyComponent]
    })
    export class SurveyModule{ }