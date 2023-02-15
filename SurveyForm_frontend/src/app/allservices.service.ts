import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RootObject } from './dynamic/dynamic.component';
import { HistoryRootObject } from './history/history.component';
import { ResponsesRootObject } from './survey-responses/survey-responses.component';
@Injectable({
  providedIn: 'root'
})

export class AllservicesService {
  public token:string|null=localStorage.getItem('token');
  public httpHeaders = new HttpHeaders({
    'content-Type': 'application/json',
    'authorization': ""+this.token
  })
  
  //Constructor...
  constructor(
    private httpClient: HttpClient
  ) { }



  //Register User
  registerUser(userObj: any) {
    // let httpHeaders = new HttpHeaders({
    //   'content-Type': 'application/json',
    //   'authorization': ""+this.token
    // })
    return this.httpClient.post('http://localhost:7777/users/register',
      userObj,
      { headers: this.httpHeaders })
  }




  //Get All Users
  async getAllUsers() {

    return  this.httpClient.get('http://localhost:7777/users/getall')
  }




  //Get a User ID By its Email...
  getUserIDByEmail() {
    let token=localStorage.getItem('token');
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
      'authorization': ""+token
    })
    return this.httpClient.post('http://localhost:7777/users/get',
      { headers: httpHeaders })
  }



  //Login request...
  login(userObj: any) {
    // let httpHeaders = new HttpHeaders({
    //   'content-Type': 'application/json',
    //   'authorization': ""+this.token
    // })
    return this.httpClient.post('http://localhost:7777/users/login',
      userObj,
      { headers: this.httpHeaders });
  }




  //Add Servey Structure to Database
  createSurvey(surveyObj: any) {
    
    console.log(this.token);
    // let httpHeaders = new HttpHeaders({
    //   'content-Type': 'application/json',
    //   'authorization': ""+this.token
    // })
    return this.httpClient.post('http://localhost:7777/survey/addsurvey',
      surveyObj,
      { headers: this.httpHeaders });
  }



  //All Survey Created By User
  getAllSurveyofUser(user_id: any) {
    // let httpHeaders = new HttpHeaders({
    //   'content-Type': 'application/json',
    //   'authorization': ""+this.token
    // })
    return this.httpClient.get<HistoryRootObject>(`http://localhost:7777/survey/get/${user_id}`,
      { headers: this.httpHeaders })
  }



  //Fetch induvisual Survey From Database for recording Response..
  getSurveyStructure(survey_id: any) {
    // let httpHeaders = new HttpHeaders({
    //   'content-Type': 'application/json',
    //   'authorization': ""+this.token
    // })
    return this.httpClient.get<RootObject>(`http://localhost:7777/survey/${survey_id}`,
      { headers: this.httpHeaders });
  }





  //Fetch Survey ID
  getSurveyID(survey: any) {
    // let httpHeaders = new HttpHeaders({
    //   'content-Type': 'application/json',
    //   'authorization': ""+this.token
    // })
    return this.httpClient.post(`http://localhost:7777/survey/get`,
      survey,
      { headers: this.httpHeaders })
  }

  //Delete Survey By Survey ID
  deleteSurveyBySurveyID(survey_id:any){
    // let httpHeaders = new HttpHeaders({
    //   'content-Type': 'application/json',
    //   'authorization': ""+this.token
    // })
    return this.httpClient.delete(`http://localhost:7777/survey/delete/${survey_id}`,{headers:this.httpHeaders});
  }


  //Responses Services 

  //Get all responses by SurveyID

  getAllResponsesBySurveyID(survey_id:any){
    return this.httpClient.get<ResponsesRootObject>(`http://localhost:7777/responses/get/${survey_id}`,{headers:this.httpHeaders});
  }

  //add Response to database
  saveResponse(responseObj:any,survey_id:string){
    return this.httpClient.post(`http://localhost:7777/responses/addresponse/${survey_id}`,responseObj,{headers:this.httpHeaders})
  }


}







