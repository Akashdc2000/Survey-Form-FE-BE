import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { HeaderComponent } from './header/header.component';
import { HistoryComponent } from './history/history.component';
import { LoaderComponent } from './loader/loader.component';

import { SurveyResponsesComponent } from './survey-responses/survey-responses.component';
import { CreateFormComponent } from './survey/create-form/create-form.component';
import { ThankyouComponent } from './thankyou/thankyou.component';


const routes: Routes = [
  // {path:'',pathMatch: 'full', redirectTo: '/signin'},
  {path:'signin',component: SigninComponent},
  {path:'register',component: RegisterComponent},
  {path:'thankyou',component: ThankyouComponent},
  {path:'dynamic/:id',component: DynamicComponent},
  {path:'history/:id',component: HistoryComponent},
  {path:'survey_responses/:id',component: SurveyResponsesComponent},
  {path:'loader',component: LoaderComponent},
  {path:'header',component: HeaderComponent},
  {path:'mainpage',component: CreateFormComponent},
  

  {
    path:'',redirectTo: '/loader',pathMatch: 'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
