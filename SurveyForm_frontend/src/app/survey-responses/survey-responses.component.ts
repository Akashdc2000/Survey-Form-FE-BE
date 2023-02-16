import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AllservicesService } from '../allservices.service';


export interface Survey {
  question: string;
  answer: string;
}

export interface Respons {
  _id: string;
  survey_id: string;
  title: string;
  email: string;
  survey: Survey[];
}

export class ResponsesRootObject {
  message: string = '';
  Responses: Respons[] = [];
}

@Component({
  selector: 'app-survey-responses',
  templateUrl: './survey-responses.component.html',
  styleUrls: ['./survey-responses.component.scss']
})
export class SurveyResponsesComponent implements OnInit {
  public data: any;
  public url: String = '';
  public surveyID: String = '';

  constructor(
    public allservices: AllservicesService,
    private route: Router
  ) {
  }
  ngOnInit(): void {
    if (!localStorage.getItem('token'))
      this.route.navigate(['/signin']);

    //To get a SurveyID from URL
    this.url = (this.route.routerState.snapshot.url)
    this.surveyID = this.url.split('/')[2]

    this.allservices.getAllResponsesBySurveyID(this.surveyID).subscribe((response: ResponsesRootObject) => {
      console.log(response);
      this.data = response;
      console.log(this.data.message)
    });

  }


  //Download CSV File...
  downloadCSV() {

    const responseObject = [] as any;
    console.log(this.data.Responses)
    this.data.Responses.forEach((element: any) => {
      element.survey.forEach((ele: any) => {
        ele.Response_ID = element._id;
        ele.email = element.email;
        responseObject.push(ele);
      });
    });
    console.log(responseObject);
    var option = {
      title: 'Survey Form',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers: ['Question', 'Answer', 'Response_ID', "Email"]
    };

    new ngxCsv(responseObject, "Responses", option);

  }

}
