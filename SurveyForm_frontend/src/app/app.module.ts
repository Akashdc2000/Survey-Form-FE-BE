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

import { HistoryComponent } from './history/history.component';
import { SurveyResponsesComponent } from './survey-responses/survey-responses.component';
import { LoaderComponent } from './loader/loader.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmailComponent } from './survey/email/email.component';
import { HeadComponent } from './survey/head/head.component';
import { NumberComponent } from './survey/number/number.component';
import { MultipleCorrectComponent } from './survey/multiple-correct/multiple-correct.component';
import { SingleCorrectComponent } from './survey/single-correct/single-correct.component';
import { ShortAnsComponent } from './survey/short-ans/short-ans.component';
import { CreateFormComponent } from './survey/create-form/create-form.component';


import {MatSelectModule} from '@angular/material/select';


import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ThankyouComponent } from './thankyou/thankyou.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    MainPageComponent,
    DynamicComponent,

    HistoryComponent,
    SurveyResponsesComponent,
    LoaderComponent,
    HeaderComponent,
    EmailComponent,
    HeadComponent,
    NumberComponent,
    MultipleCorrectComponent,
    SingleCorrectComponent,
    ShortAnsComponent,
    CreateFormComponent,
    ThankyouComponent

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
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
