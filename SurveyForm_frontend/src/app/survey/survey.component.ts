import { Component, OnInit} from "@angular/core";
import { HttpClient ,HttpHeaders} from "@angular/common/http";
@Component({
    selector: 'survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss']
  })
  export class SurveyComponent implements OnInit{
    
    public surveyID:String='';
    constructor(
      public httpClient:HttpClient
    ){
  }
  ngOnInit() {
      console.log('survey app');
  }

  publishlink(){
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json'
    })
    try {
      this.httpClient.post('http://localhost:7777/survey/get',{
        email:"akash@gmail.com",title:"Welcome to Iauro Family"
      },{ headers: httpHeaders }).subscribe(data=>{
        this.surveyID=JSON.parse(JSON.stringify(data)).survey_id;
        alert('http://localhost:4200/dynamic/'+this.surveyID)
      })
    } catch (error) {
      
    }
  }
}
  


