import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs'
import { RootObject } from './dynamic/dynamic.component';
@Injectable({
  providedIn: 'root'
})

export class AllservicesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  //Register User
  registerUser(userObj: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json'
    })
    return this.httpClient.post('http://localhost:7777/users/register',
      userObj,
      { headers: httpHeaders })
  }

  //Get All Users
  async getAllUsers() {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json'
    })
    return await this.httpClient.get('http://localhost:7777/users/getall')
  }


  //Login request...
  login(userObj: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json'
    })
    return this.httpClient.post('http://localhost:7777/users/login',
      userObj,
      { headers: httpHeaders });
  }

//Add Servey Structure to Database
  createSurvey(surveyObj: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json'
    })
    return this.httpClient.post('http://localhost:7777/survey/addsurvey',
    surveyObj,
      { headers: httpHeaders });
  }


  // //All Survey Created By User
  // getAllSurveyofUser(user_id: any) {
  //   let httpHeaders = new HttpHeaders({
  //     'content-Type': 'application/json'
  //   })
  //   return this.httpClient.get(`http://localhost:7777/survey/${survey_id}`,
  //     { headers: httpHeaders })
  // }


  //Fetch induvisual Survey From Database for recording Response..
  getSurveyStructure(survey_id: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json'
    })
    return this.httpClient.get<RootObject>(`http://localhost:7777/survey/${survey_id}`,
      { headers: httpHeaders });
  }




  //Fetch Survey ID
  getSurveyID(survey: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json'
    })
    return this.httpClient.post(`http://localhost:7777/survey/get`,
      survey,
      { headers: httpHeaders })
  }




}






