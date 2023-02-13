import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { HeaderComponent } from './header/header.component';
import { HistoryComponent } from './history/history.component';
import { LoaderComponent } from './loader/loader.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SurveyResponsesComponent } from './survey-responses/survey-responses.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  // {path:'',pathMatch: 'full', redirectTo: '/signin'},
  {path:'signin',component: SigninComponent},
  {path:'register',component: RegisterComponent},
  {path:'mainpage',component: MainPageComponent},
  {path:'dynamic/:id',component: DynamicComponent},
  {path:'survey',component: SurveyComponent},
  {path:'history/:id',component: HistoryComponent},
  {path:'survey_responses/:id',component: SurveyResponsesComponent},
  {path:'loader',component: LoaderComponent},
  {path:'header',component: HeaderComponent},


  {
    path:'',redirectTo: '/loader',pathMatch: 'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
