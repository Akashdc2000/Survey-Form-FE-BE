import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { SurveyComponent } from './survey/survey.component';
import { HistoryComponent } from './history/history.component';
import { SurveyResponsesComponent } from './survey-responses/survey-responses.component';
import { LoaderComponent } from './loader/loader.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    MainPageComponent,
    DynamicComponent,
    SurveyComponent,
    HistoryComponent,
    SurveyResponsesComponent,
    LoaderComponent,
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    IonicModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
